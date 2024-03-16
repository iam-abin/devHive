import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { notificationsRepository },
	} = dependencies;

	if (!notificationsRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute =(senderId: string, receiverId: string) => {
        console.log("in delete notifications usecase",senderId, receiverId);
        
		return notificationsRepository.clearAllNotificationsBySenderId(senderId, receiverId);
	};

	return { execute };
};
