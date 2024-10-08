import userRepository from "../../repositories/mongo/user.repository";

export const handleMessage = (data: any, topic: string, message: any) => {
    switch (topic) {
        case "USER-CREATED-TOPIC":
            userRepository.createUser(data);
            break;

        case "USER-UPDATED-TOPIC":
            userRepository.updateUser(data.userId, data);
            console.log(data);

            break;

        case "CANDIDATE-PROFILE-UPDATED-TOPIC":
            console.log(data);
            const userData = {
                name: data.name,
                profile_image: data.profile_image,
                isActive: data.isActive,
            };
            console.log(userData);
            userRepository.updateUser(data.userId, userData);

            break;

        default:
            break;
    }
};
