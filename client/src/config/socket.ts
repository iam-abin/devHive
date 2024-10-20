import { io, Socket } from "socket.io-client";
import { DEVELOPMENT_ORIGIN } from "./baseUrl";


// const socket: Socket = io(PRODUCTION_ORIGIN, {
//   transports: ["websocket"],
//   path: "/api/v1/chat/socket.io",
//   withCredentials: true,
//   autoConnect: false,
// });



const socket: Socket = io(DEVELOPMENT_ORIGIN, {
  transports: ["websocket"],
  path: "/api/v1/chat/socket.io",
  withCredentials: true,
  autoConnect: false,
});

export default socket;
