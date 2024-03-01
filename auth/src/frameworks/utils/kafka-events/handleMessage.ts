import usersRepository from "../../repositories/mongo/usersRepository";

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		case "USER-UPDATED-TOPIC":
			console.log("admin handleMessage userUpdatedTopic", data);
			usersRepository.updateUser(data.userId, data);

			break;
			// case "USER-UPDATED-TOPIC":
			// 	console.log("admin handleMessage userUpdatedTopic", data);
			// 	usersRepository.updateUser(data.userId, data);
	
			// 	break;
			
		default:
			break;
	}
};
