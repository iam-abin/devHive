import createNotificationController from "./create-notification.controller";
import getAllNotificationsController from "./get-all-notifications.controller";
import deleteAllNotificationsController from "./deleteNotifications.controller";
import getAllNotificationsCountController from "./get-all-notifications-count.controller";
import deleteAllNotificationsBySenderController from "./deleteNotificationsOfASender.controller";
import getUnreadMessagesCountController from "./getUnreadMessagesCount.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		createNotificationController: createNotificationController(dependencies),
		getAllNotificationsController: getAllNotificationsController(dependencies),
		deleteAllNotificationsController: deleteAllNotificationsController(dependencies),
		getAllNotificationsCountController: getAllNotificationsCountController(dependencies),
		deleteAllNotificationsBySenderController: deleteAllNotificationsBySenderController(dependencies),
		getUnreadMessagesCountController: getUnreadMessagesCountController(dependencies),
	};
};
