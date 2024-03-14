import createNotificationController from "./create-notification.controller";
import getAllNotificationsController from "./get-all-notifications.controller";
import deleteAllNotificationsController from "./delete-all-notifications.controller";

import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	return {
		createNotificationController: createNotificationController(dependencies),
		getAllNotificationsController: getAllNotificationsController(dependencies),
		deleteAllNotificationsController: deleteAllNotificationsController(dependencies),
	};
};
