import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { messageRepository },
	} = dependencies;

	if (!messageRepository) {
		throw new Error("messageRepository should exist in dependencies");
	}

	const execute =(userId: string) => {
        console.log("in getAllChatRoomsByUserId usecase",userId);
        
		return messageRepository.getAllChatRoomsByUserId(userId);
	};

	return { execute };
};
