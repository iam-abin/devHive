import express from "express";

import { chatControllers, notificationControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import { requireAuthRecruiter } from "@abijobportal/common";
import getUnreadMessagesCountController from "../../../controllers/notification/get-unread-messages-count.controller";

export const recruiterRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const { getAllChatRoomsByUserIDController, getConversationController } =
		chatControllers(dependencies);

	const {
		getAllNotificationsController,
		createNotificationController,
		deleteAllNotificationsController,
		getAllNotificationsCountController,
		deleteAllNotificationsBySenderController,
	} = notificationControllers(dependencies);

	router.get("/chat-rooms/:userId", getAllChatRoomsByUserIDController);

	router.get("/room-conversation/:chatRoomId", getConversationController);

	router.get("/notifications/:userId", getAllNotificationsController);

	router.post("/create", createNotificationController);

	router.delete("/notifications/:userId", deleteAllNotificationsController);

	router.delete("/delete-notifications-by-senderId/:senderId/:receiverId", deleteAllNotificationsBySenderController);

	router.get("/unread-messages-count/:senderId/:receiverId", getUnreadMessagesCountController);

	router.get(
		"/notifications-count/:userId",
		getAllNotificationsCountController
	);

	return router;
};
