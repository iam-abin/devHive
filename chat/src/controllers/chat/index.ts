import getAllChatRoomsByUserIDController from "./get-all-chat-rooms.controller";
import getConversationController from "./get-conversation.controller";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		getAllChatRoomsByUserIDController: getAllChatRoomsByUserIDController(dependencies),
		getConversationController: getConversationController(dependencies),
	};
};
