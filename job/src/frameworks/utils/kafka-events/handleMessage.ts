import jobRepository from "../../repositories/mongo/job.repository";
import userRepository from "../../repositories/mongo/user.repository";

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string ,message: any) => {
	switch (topic) {
		
		case "JOB-UPDATED-TOPIC":
			const {jobId} = data
			jobRepository.updateJob(jobId,data)
			break;

		case "USER-CREATED-TOPIC":
			userRepository.createUser(data);
			break;

		case "USER-UPDATED-TOPIC":
			userRepository.updateUser(data.userId, data);
			break;
	
		case "PREMIUM-PAYMENT-TOPIC":
			console.log(data.candidateId);
			userRepository.premiumPaymentDone(data.candidateId, data);
			break;

		default:
			break;
	}
};
