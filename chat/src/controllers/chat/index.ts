import getAllChatRoomsByUserIDController from "./get-all-chat-rooms.controller";
import getConversationController from "./get-conversation.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		getAllChatRoomsByUserIDController: getAllChatRoomsByUserIDController(dependencies),
		getConversationController: getConversationController(dependencies),
	};
};
