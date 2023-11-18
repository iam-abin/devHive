// message handling kafka
import usersRepository from "../repositories/mongo/usersRepository";

interface handleMessageInterface {
	parsedObject: any;
	topic: string;
}

export const handleMessage = ({ topic, parsedObject: data }: handleMessageInterface) => {
	switch (topic) {
		case "USER_UPDATED_TOPIC":
			console.log("auth handleMessage updateYserTopic",data);
			
			// dont need to check userType as every users are stored in one collection 
			usersRepository.updateStatus(data);

			break;
		default:
			break;
	}
};
