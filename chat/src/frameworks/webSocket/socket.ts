import { Server, Socket } from "socket.io";
import http from "http"
import { Server as SockerIo } from "socket.io";


interface activeUsersType{
    userId: string,
    socketId: string
}

let activeUsers: activeUsersType[] = []


export const setupSocketIO = (Server: http.Server)=>{

    const io = new SockerIo(Server,{
        // pingTimeout:60000,
        cors:{
            // origin: 'https://devhive.dev/api/v1/chat',
            origin: '*',
            methods: ['GET','POST'],
    
        }
    })

    io.on("connection",(socket: Socket)=>{
        onSocketConnection(io, socket)
    })
}


export const onSocketConnection = (io: Server, socket: Socket)=>{
    console.log('a user connected to socket...');
}