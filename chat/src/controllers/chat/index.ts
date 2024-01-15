import createChatRoomController from "./create-chat-room.controller";
import getAllChatRoomsController from "./get-all-chat-rooms.controller";
import getChatRoomController from "./get-chat-room-controller";
import sendMessageController from "./send-message.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		createChatRoomController: createChatRoomController(dependencies),
		getAllChatRoomsController: getAllChatRoomsController(dependencies),
		getChatRoomController: getChatRoomController(dependencies),
		sendMessageController: sendMessageController(dependencies),
	};
};
