import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const {
		repositories: { notificationsRepository },
	} = dependencies;

	if (!notificationsRepository) {
		throw new Error("notificationsRepository should exist in dependencies");
	}

	const execute =(userId: string) => { 
		return notificationsRepository.getAllNotificationsByUserId(userId);
	};

	return { execute };
};
