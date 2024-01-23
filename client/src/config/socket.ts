import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://devhive.dev", {
  transports: ["websocket"],
  path: "/api/v1/chat/socket.io",
  withCredentials: true,
  autoConnect: false,
});

export default socket;
