import express from "express";

import { chatControllers, notificationControllers } from "../../../controllers";
import { IDependency } from "../../types/dependencyInterface";
import { auth, ROLES } from "@abijobportal/common";

export const recruiterRouter = (dependencies: IDependency) => {
    const router = express.Router();

    const chatController = chatControllers(dependencies);
    const notificationController = notificationControllers(dependencies);

    router.use(auth(ROLES.RECRUITER));

    // Chat
    router.get(
        "/chat-rooms/:userId",
        chatController.getAllChatRoomsByUserIDController
    );

    router.get(
        "/room/conversation/:chatRoomId",
        chatController.getConversationController
    );

    // Notification
    router.get(
        "/notifications",
        notificationController.getAllNotificationsController
    );

    router.get(
        "/notifications/count",
        notificationController.getAllNotificationsCountController
    );

    router.delete(
        "/notifications",
        notificationController.deleteAllNotificationsController
    );

    router.delete(
        "/notifications/sender/:senderId",
        notificationController.deleteAllNotificationsBySenderController
    );

    // Message
    router.get(
        "/messages/unread-count/:senderId",
        notificationController.getUnreadMessagesCountController
    );

    return router;
};
