import React, { useState } from "react";
import Chat from "./Chat";

const ChatButton = ({ userId, receiverId }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl shadow-lg hover:bg-blue-600 z-50"
      >
        
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 h-[500px] bg-white rounded-xl shadow-xl flex flex-col z-50 border border-gray-200">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-t-xl font-bold flex justify-between items-center">
            Chat
            <button onClick={() => setOpen(false)} className="text-white text-lg">
              ✖
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <Chat userId={userId} receiverId={receiverId} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatButton;
