import express from "express";

import { userControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import {
	requireAuthAdmin,
	requireAuthCandidate,
	requireAuthRecruiter,
} from "@abijobportal/common";

export const chatRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	const {
		getAllChatRoomswithUserIDController,
		getChatRoomWithRoomIdController,
		sendNewMessageController,
		createChatRoomController,
	} = userControllers(dependencies);

	router.get(
		"/get-all-chat-rooms/:userId",
		getAllChatRoomswithUserIDController
	);

	router.get("/get-a-chat-room/:chatRoomId", getChatRoomWithRoomIdController);

	router.post("/new-message/:roomId", sendNewMessageController);

	router.post(
		"/create-chat-room/:currentUserId/:secondPersonId",
		createChatRoomController
	);

	return router;
};
