import usersRepository from "../../repositories/mongo/usersRepository";

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		case "USER-UPDATED-TOPIC":
			console.log("inside user update topic ", data.id, data);
			
			usersRepository.updateUser(data.id, data);

			break;
			
		default:
			break;
	}
};
