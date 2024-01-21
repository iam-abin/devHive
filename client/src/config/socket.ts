import { io, Socket } from "socket.io-client";
import { BASE_URL } from "./baseUrl";

// export const socket = io(`${BASE_URL}/chat`)
// export const socket = io(`https://devhive.dev`)

// export const socket = io(`https://devhive.dev`,{
//     transports: ['websocket'],
//     path: '/api/v1/chat',
//     withCredentials: true,
//     autoConnect: false,
// })
const socket = io("https://devhive.dev", {
  transports: ["websocket"],
  path: "/api/v1/chat",
  withCredentials: true,
  autoConnect: false,
});

// const socket: Socket = io(`https://devhive.dev`, {
//     transports: ['websocket'],
//     path: '/api/v1/chat',
//     withCredentials: true,
//     autoConnect: false,
// });

export default socket;
