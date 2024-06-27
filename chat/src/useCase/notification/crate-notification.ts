import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: { notificationsRepository },
	} = dependencies;

	if (!notificationsRepository) throw new Error("notificationsRepository should exist in dependencies");

	const execute =(notificationData: any) => {
		
		return notificationsRepository.createNotification(notificationData);
	};

	return { execute };
};
