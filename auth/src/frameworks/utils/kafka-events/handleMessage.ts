import usersRepository from "../../repositories/mongo/users.repository";

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		case "USER-UPDATED-TOPIC":
			usersRepository.updateUser(data.userId, data);
			break;
			
		default:
			break;
	}
};
