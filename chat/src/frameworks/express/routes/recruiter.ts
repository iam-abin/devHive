import express from "express";

import { chatControllers, notificationControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import {
	requireAuthRecruiter,
} from "@abijobportal/common";

export const recruiterRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		getAllChatRoomsByUserIDController,
		getConversationController
	} = chatControllers(dependencies);

	const { getAllNotificationsController,
		createNotificationController,
	deleteAllNotificationsController } = notificationControllers(dependencies)

	router.get("/chat-rooms/:userId", getAllChatRoomsByUserIDController);

	router.get("/room-conversation/:chatRoomId", getConversationController);

	router.get("/notificatons/:userId", getAllNotificationsController);
	
	router.post("/create", createNotificationController);

	router.delete("/notifications/:userId", deleteAllNotificationsController);

	return router;
};
