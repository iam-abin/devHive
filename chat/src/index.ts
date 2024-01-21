// import { connectDB } from "./config/db";
// import { kafkaClient } from "./config/kafka-connection";
// import { app, httpServer } from "./frameworks/express/app";
// import { UserCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-created-consumer";
// import { UserUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-updated-consumer";
// import { setupSocketIO } from "./frameworks/webSocket/socket";

// const start = async () => {
// 	console.log("chat service Starting up....");import { connectDB } from "./config/db";
// import { kafkaClient } from "./config/kafka-connection";
// import { app, httpServer } from "./frameworks/express/app";
// import { UserCreatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-created-consumer";
// import { UserUpdatedEventConsumer } from "./frameworks/utils/kafka-events/consumers/user-updated-consumer";
// import { setupSocketIO } from "./frameworks/webSocket/socket";

// const start = async () => {
// 	console.log("chat service Starting up....");

//     //if we do not set MONGO_URL_CHAT
// 	if (!process.env.MONGO_URL_CHAT) {
// 		throw new Error("MONGO_URL_CHAT must be defined");
// 	}

//     //if we do not set JWT_SECRET_KEY
// 	if (!process.env.JWT_SECRET_KEY) {
// 		throw new Error("JWT_SECRET_KEY must be defined");
// 	}

// 	// if we do not set JWT_REFRESH_SECRET_KEY
// 	if (!process.env.JWT_REFRESH_SECRET_KEY) {
// 		throw new Error("JWT_REFRESH_SECRET_KEY must be defined");
// 	}


	
// 	console.log("before socket instance");
// 	setupSocketIO(httpServer);
// 	console.log("after socket instance");

// 	await connectDB();

// 	const userCreatedEvent = new UserCreatedEventConsumer(kafkaClient);
// 	const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient);

// 	await userUpdatedEvent.subscribe();
// 	await userCreatedEvent.subscribe();

    
// 	app.listen(3000, () => {
// 		console.log("chat service Listening on port 3000....");
// 	})
// 		.on("error", async () => {
// 			await userUpdatedEvent.disconnect();
// 			await userCreatedEvent.disconnect();
// 		})
// 		.on("close", async () => {
// 			await userUpdatedEvent.disconnect();
// 			await userCreatedEvent.disconnect();
// 		});
// };

// start();

//     //if we do not set MONGO_URL_CHAT
// 	if (!process.env.MONGO_URL_CHAT) {
// 		throw new Error("MONGO_URL_CHAT must be defined");
// 	}

//     //if we do not set JWT_SECRET_KEY
// 	if (!process.env.JWT_SECRET_KEY) {
// 		throw new Error("JWT_SECRET_KEY must be defined");
// 	}

// 	// if we do not set JWT_REFRESH_SECRET_KEY
// 	if (!process.env.JWT_REFRESH_SECRET_KEY) {
// 		throw new Error("JWT_REFRESH_SECRET_KEY must be defined");
// 	}


	
// 	console.log("before socket instance");
// 	setupSocketIO(httpServer);
// 	console.log("after socket instance");

// 	await connectDB();

// 	const userCreatedEvent = new UserCreatedEventConsumer(kafkaClient);
// 	const userUpdatedEvent = new UserUpdatedEventConsumer(kafkaClient);

// 	await userUpdatedEvent.subscribe();
// 	await userCreatedEvent.subscribe();

    
// 	app.listen(3000, () => {
// 		console.log("chat service Listening on port 3000....");
// 	})
// 		.on("error", async () => {
// 			await userUpdatedEvent.disconnect();
// 			await userCreatedEvent.disconnect();
// 		})
// 		.on("close", async () => {
// 			await userUpdatedEvent.disconnect();
// 			await userCreatedEvent.disconnect();
// 		});
// };

// start();

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    path: "/api/v1/chat",
    cors: {
        origin: "*",
        allowedHeaders: ["Authentication"],
        credentials: true,
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("New user connected ,id is: ", socket.id);
    console.log("Socket is active and connected.");

    socket.on("chat", (payload) => {
        console.log("Received chat message: ", payload);
        io.emit("chat", payload);
    });
});

io.on("disconnect", (socket) => {
    console.log("a user disconnected");

    // removeUser(socket.id);
    // io.emit("getActiveUsers", activeUsers);
});


app.get('/', (req, res) => {
    res.send("Hello, world!");
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    console.log("chat service Listening on port 3000....");
});
