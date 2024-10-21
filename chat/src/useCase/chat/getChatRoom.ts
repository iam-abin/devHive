import { NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { ObjectId } from "mongoose";

export = (dependencies: IDependency) => {
    const {
        repositories: { chatRoomRepository, messageRepository },
    } = dependencies;

    if (!messageRepository) {
        throw new Error(
            "jobApplicationRepository should exist in dependencies"
        );
    }

    const execute = async (currentUserId: string, chatRoomId: string) => {
        const chatRoom = await chatRoomRepository.getById(chatRoomId);
        if (!chatRoom) throw new NotFoundError("chatroom not found");

        const isCurrentUsersRoom = chatRoom?.users.some(
            (userId: ObjectId) => userId.toString() === currentUserId
        );

        if (!isCurrentUsersRoom)
            throw new NotFoundError("user not belongs to this chat room");

        return await messageRepository.getChatMessages(chatRoomId);
    };

    return { execute };
};
