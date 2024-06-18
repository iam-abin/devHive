import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: { notificationsRepository },
	} = dependencies;

	if (!notificationsRepository) {
		throw new Error("notificationsRepository should exist in dependencies");
	}

	const execute =(userId: string) => { 
		return notificationsRepository.getAllNotificationsCountByUserId(userId);
	};

	return { execute };
};
