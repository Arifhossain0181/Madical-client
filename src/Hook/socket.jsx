import { io } from "socket.io-client";

// Backend server URL
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: false, // Disable auto-connect to prevent errors
}); 

export default socket;
