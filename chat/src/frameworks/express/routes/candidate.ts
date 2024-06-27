import express from "express";

import { chatControllers, notificationControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";
import { requireAuthCandidate } from "@abijobportal/common";

export const candidateRouter = (dependencies: IDependenciesData) => {
	const router = express.Router();

	const { getAllChatRoomsByUserIDController, getConversationController } =
		chatControllers(dependencies);

	const {
		getAllNotificationsController,
		createNotificationController,
		deleteAllNotificationsController,
		getAllNotificationsCountController,
		deleteAllNotificationsBySenderController,
		getUnreadMessagesCountController,
	} = notificationControllers(dependencies);

	router.get("/chat-rooms/:userId", getAllChatRoomsByUserIDController);

	router.get("/room-conversation/:chatRoomId", getConversationController);

	router.get("/notifications/:userId", getAllNotificationsController);

	router.get("/notifications-count/:userId", getAllNotificationsCountController);
	
	router.post("/create", createNotificationController);

	router.delete("/notifications/:userId", deleteAllNotificationsController);
	
	router.delete("/delete-notifications-by-senderId/:senderId/:receiverId", deleteAllNotificationsBySenderController);
	
	router.get("/unread-messages-count/:senderId/:receiverId", getUnreadMessagesCountController);

	return router;
};
