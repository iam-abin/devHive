import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { messageRepository },
	} = dependencies;

	if (!messageRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute =(chatRoomId: object) => {
        console.log("in getConversation usecase",chatRoomId);
        
		return messageRepository.getChatMessages(chatRoomId);
	};

	return { execute };
};
