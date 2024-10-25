import { NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const {
		repositories: { userRepository, chatRoomRepository },
	} = dependencies;

	if (!chatRoomRepository) {
		throw new Error("chatRoomRepository should exist in dependencies");
	}

	const execute =async (userId: string) => {
		const user = await userRepository.getById(userId);
		if(!user) throw new NotFoundError("user not found")
		const chatRooms = await chatRoomRepository.getAllChatRoomsByUserId(userId);
		return chatRooms
	};

	return { execute };
};
