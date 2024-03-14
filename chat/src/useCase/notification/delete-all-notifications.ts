import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { notificationsRepository },
	} = dependencies;

	if (!notificationsRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute =(userId: string) => {
        console.log("in delete notifications usecase",userId);
        
		return notificationsRepository.clearAllNotificationsByUserId(userId);
	};

	return { execute };
};
