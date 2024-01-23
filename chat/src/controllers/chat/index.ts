import createChatRoomController from "./create-chat-room.controller";
import getAllChatRoomsByUserIDController from "./get-all-chat-rooms.controller";
import getChatRoomController from "./get-chat-room-controller";
import sendMessageController from "./send-message.controller";
import getConversationController from "./get-conversation.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		createChatRoomController: createChatRoomController(dependencies),
		getAllChatRoomsByUserIDController: getAllChatRoomsByUserIDController(dependencies),
		getChatRoomController: getChatRoomController(dependencies),
		sendMessageController: sendMessageController(dependencies),
		getConversationController: getConversationController(dependencies),
	};
};
