import jobRepository from "../../repositories/mongo/job.repository";

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
		default:
			break;
	}
};
