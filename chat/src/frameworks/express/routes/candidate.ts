import express from "express";

import { chatControllers, notificationControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";
// import { auth } from "@abijobportal/common";

export const candidateRouter = (dependencies: IDependenciesData) => {
	const router = express.Router();

	const chatController =
		chatControllers(dependencies);

	const notificationController = notificationControllers(dependencies);

	router.get("/chat-rooms/:userId", chatController.getAllChatRoomsByUserIDController);

	router.get("/room-conversation/:chatRoomId", chatController.getConversationController);

	router.get("/notifications/:userId", notificationController.getAllNotificationsController);

	router.get("/notifications-count/:userId", notificationController.getAllNotificationsCountController);
	
	router.post("/create", notificationController.createNotificationController);

	router.delete("/notifications/:userId", notificationController.deleteAllNotificationsController);
	
	router.delete("/delete-notifications-by-senderId/:senderId/:receiverId", notificationController.deleteAllNotificationsBySenderController);
	
	router.get("/unread-messages-count/:senderId/:receiverId", notificationController.getUnreadMessagesCountController);

	return router;
};
