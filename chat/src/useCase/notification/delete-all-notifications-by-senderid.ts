import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: { notificationsRepository },
	} = dependencies;

	if (!notificationsRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute =(senderId: string, receiverId: string) => { 
		return notificationsRepository.clearAllNotificationsBySenderId(senderId, receiverId);
	};

	return { execute };
};
