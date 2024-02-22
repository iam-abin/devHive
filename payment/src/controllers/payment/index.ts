import getAllChatRoomsByUserIDController from "./get-all-chat-rooms.controller";
import getConversationController from "./get-conversation.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		getAllChatRoomsByUserIDController: getAllChatRoomsByUserIDController(dependencies),
		getConversationController: getConversationController(dependencies),
	};
};
