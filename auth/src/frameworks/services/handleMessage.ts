import usersRepository from "../repositories/mongo/usersRepository";

interface handleMessageInterface {
	parsedObject: any;
	topic: string;
}

export const handleMessage = ({ topic, parsedObject: data }: handleMessageInterface) => {
	switch (topic) {
		case "USER_UPDATED_TOPIC":
			console.log("auth handleMessage updateYserTopic",data);
			if(data.userType === "candidate"){
				usersRepository.updateStatus(data);
			}else if(data.userType === "recruiter"){

			}
			
			break;
		default:
			break;
	}
};
