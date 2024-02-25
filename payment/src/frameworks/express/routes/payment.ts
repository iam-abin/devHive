import express from "express";

import { chatControllers, userControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import {
	requireAuthAdmin,
	requireAuthCandidate,
	requireAuthRecruiter,
} from "@abijobportal/common";

export const paymentRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		// getAllChatRoomsByUserIDController,
		cratePaymentController
	} = chatControllers(dependencies);

	router.use(requireAuthCandidate)

	router.post(
		"/create-payment",
		cratePaymentController  
	);

	// router.get("/room-conversation/:chatRoomId", getConversationController);

	// router.post("/new-message/:roomId", sendNewMessageController);

	// router.post(
	// 	"/create-chat-room/:currentUserId/:secondPersonId",
	// 	createChatRoomController
	// );

	return router;
};
