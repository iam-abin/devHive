import getAllNotificationsController from "./getNotifications.controller";
import deleteAllNotificationsController from "./deleteNotifications.controller";
import getAllNotificationsCountController from "./getNotificationsCount.controller";
import deleteAllNotificationsBySenderController from "./deleteNotificationsOfASender.controller";
import getUnreadMessagesCountController from "./getUnreadMessagesCount.controller";

import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	return {
		getAllNotificationsController: getAllNotificationsController(dependencies),
		deleteAllNotificationsController: deleteAllNotificationsController(dependencies),
		getAllNotificationsCountController: getAllNotificationsCountController(dependencies),
		deleteAllNotificationsBySenderController: deleteAllNotificationsBySenderController(dependencies),
		getUnreadMessagesCountController: getUnreadMessagesCountController(dependencies),
	};
};
