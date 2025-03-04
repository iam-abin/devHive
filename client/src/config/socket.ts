import { io, Socket } from "socket.io-client";
import { DEVELOPMENT_ORIGIN } from "./baseUrl";
import { getItemFromLocalStorage } from "../utils/localStorage";
import { LOCAL_STORAGE } from "../utils/constants";

const token: string | null = getItemFromLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN);

// const socket: Socket = io(PRODUCTION_ORIGIN, {
//   transports: ["websocket"],
//   path: "/api/v1/chat/socket.io",
//   withCredentials: true,
//   autoConnect: false,
// auth: { token: `Bearer ${token}` }
// });



const socket: Socket = io(DEVELOPMENT_ORIGIN, {
  transports: ["websocket"],
  path: "/api/v1/chat/socket.io",
  withCredentials: true,
  autoConnect: false,
  auth: { accessToken: `Bearer ${token}` }
});

export default socket;
