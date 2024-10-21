import userRepository from "../../repositories/mongo/user.repository";

export const handleMessage = (data: any, topic: string, message: any) => {
    switch (topic) {
        case "USER-CREATED-TOPIC":
            userRepository.createUser(data);
            break;

        case "USER-UPDATED-TOPIC":
            userRepository.updateUser(data.userId, data);
            break;

        case "CANDIDATE-PROFILE-UPDATED-TOPIC":
            const userData = {
                name: data.name,
                profileImage: data.profileImage,
                isActive: data.isActive,
            };
            
            userRepository.updateUser(data.userId, userData);

            break;

        default:
            break;
    }
};
