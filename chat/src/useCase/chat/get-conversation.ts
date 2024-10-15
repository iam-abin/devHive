import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const {
		repositories: { messageRepository },
	} = dependencies;

	if (!messageRepository) {
		throw new Error("jobApplicationRepository should exist in dependencies");
	}

	const execute =(chatRoomId: object) => {
		
		return messageRepository.getChatMessages(chatRoomId);
	};

	return { execute };
};
