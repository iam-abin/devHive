import { searchUserUseCase, getAllUsersUseCase } from "./user";

import { getChatRoomsUseCase, getConversationUseCase } from "./chat";

import {
	createNotificationUseCase,
	deleteAllNotificationsUseCase,
	getAllNotificationsUseCase,
	getAllNotificationsCountUseCase,
	deleteAllNotificationsBySenderIdUseCase,
	getUnreadMessagesCountUseCase,
} from "./notification";

export default {
	searchUserUseCase,
	getAllUsersUseCase,

	getChatRoomsUseCase,
	getConversationUseCase,

	createNotificationUseCase,
	getAllNotificationsUseCase,
	deleteAllNotificationsUseCase,
	getAllNotificationsCountUseCase,
	deleteAllNotificationsBySenderIdUseCase,
	getUnreadMessagesCountUseCase,
};
