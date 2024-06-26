import createNotificationController from "./create-notification.controller";
import getAllNotificationsController from "./get-all-notifications.controller";
import deleteAllNotificationsController from "./delete-all-notifications.controller";
import getAllNotificationsCountController from "./get-all-notifications-count.controller";
import deleteAllNotificationsBySenderController from "./delete-all-notifications-by-sender.controller";
import getUnreadMessagesCountController from "./get-unread-messages-count.controller";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	return {
		createNotificationController: createNotificationController(dependencies),
		getAllNotificationsController: getAllNotificationsController(dependencies),
		deleteAllNotificationsController: deleteAllNotificationsController(dependencies),
		getAllNotificationsCountController: getAllNotificationsCountController(dependencies),
		deleteAllNotificationsBySenderController: deleteAllNotificationsBySenderController(dependencies),
		getUnreadMessagesCountController: getUnreadMessagesCountController(dependencies),
	};
};
