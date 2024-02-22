import userRepository from "../../repositories/mongo/user.repository";

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		case "USER-CREATED-TOPIC":
			console.log("chat handleMessage createUserTopic", data);
			userRepository.createUser(data);

			break;

		case "USER-UPDATED-TOPIC":
			console.log("chat handleMessage updateUserTopic", data);
			userRepository.updateUser(data.userId, data);

			break;

		default:
			break;
	}
};
