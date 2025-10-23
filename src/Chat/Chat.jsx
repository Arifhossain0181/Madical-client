import React, { useEffect, useState, useRef } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import socket from "../Hook/socket";

const fetchChatHistory = async ({ pageParam = 0, queryKey }) => {
  const [_, userId, receiverId] = queryKey;
  const res = await fetch(
    `http://localhost:3000/chat/${userId}/${receiverId}?page=${pageParam}&limit=20`
  );
  if (!res.ok) throw new Error("Failed to fetch chat");
  return res.json();
};

const Chat = ({ userId, receiverId }) => {
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["chat", userId, receiverId],
    queryFn: fetchChatHistory,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === 0 ? undefined : pages.length,
    initialPageParam: 0,
  });

  const chat = data?.pages.flat() || [];
  const containerRef = useRef(null);

  // Socket.io join & receive message
  useEffect(() => {
    socket.emit("join", userId);

    const handleReceive = (msg) => {
      queryClient.setQueryData(["chat", userId, receiverId], (oldData) => {
        if (!oldData) return { pages: [[msg]], pageParams: [0] };
        return {
          ...oldData,
          pages: [...oldData.pages, [msg]],
        };
      });
    };

    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, [userId, receiverId, queryClient]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msgData = { senderId: userId, receiverId, message: newMessage };
    socket.emit("send_message", msgData);

    // Optimistic update
    queryClient.setQueryData(["chat", userId, receiverId], (oldData) => {
      if (!oldData) return { pages: [[msgData]], pageParams: [0] };
      return {
        ...oldData,
        pages: [...oldData.pages, [msgData]],
      };
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-md mx-auto border rounded-2xl shadow-lg bg-white">
      
      {/* Chat messages container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-3 flex flex-col gap-2"
      >
        {chat.map((c, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] ${
              c.senderId === userId
                ? "bg-blue-100 text-black self-end"
                : "bg-gray-100 text-black self-start"
            }`}
          >
            {c.message}
          </div>
        ))}
      </div>

      {/* Input field - Fixed at bottom */}
      <div className="flex gap-2 p-3 border-t bg-white sticky bottom-0">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
