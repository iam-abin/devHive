import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: { chatRoomRepository },
	} = dependencies;

	if (!chatRoomRepository) {
		throw new Error("chatRoomRepository should exist in dependencies");
	}

	const execute =(userId: string) => {
		return chatRoomRepository.getAllChatRoomsByUserId(userId);
	};

	return { execute };
};
