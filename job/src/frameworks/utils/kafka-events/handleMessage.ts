import jobRepository from "../../repositories/mongo/job.repository";
import userRepository from "../../repositories/mongo/user.repository";

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string ,message: any) => {
	switch (topic) {
		case "JOB-UPDATED-TOPIC":
			console.log("job handleMessage updateJobTopic",data);
			const {jobId} = data
			jobRepository.updateJob(jobId,data)
			
			break;
			case "USER-CREATED-TOPIC":
			console.log("chat handleMessage createUserTopic", data);
			userRepository.createUser(data);

			break;

		case "USER-UPDATED-TOPIC":
			console.log("chat handleMessage updateUserTopic", data);
			userRepository.updateUser(data.userId, data);

			break;
	
		case "PREMIUM-PAYMENT-TOPIC":
			console.log("handleMessage payment premium topic data", data);
			userRepository.premiumPaymentDone(data.candidateId, data);

			break;
		default:
			break;
	}
};
