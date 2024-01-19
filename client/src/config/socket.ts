import { io, Socket } from "socket.io-client";
// import { BASE_URL } from "./baseUrl";

const socket: Socket = io(`https://devhive.dev`, {
    transports: ['websocket'],
    path: '/api/v1/chat',
    withCredentials: true,
    autoConnect: false,
});

export default socket;
