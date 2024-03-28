import candidateRepository from "../../repositories/mongo/candidateRepository";
import recruiterRepository from "../../repositories/mongo/recruiterRepository";
import jobRepository from "../../repositories/mongo/jobRepository";
import paymentRepository from "../../repositories/mongo/paymentRepository";

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		case "USER-CREATED-TOPIC":
			if (data.userType === "candidate") {
				candidateRepository.createCandidate(data);
			} else if (data.userType === "recruiter") {
				recruiterRepository.createRecruiter(data);
			}
			break;

		case "USER-UPDATED-TOPIC":
			
			if (data.userType === "candidate") {
				candidateRepository.updateCandidateProfile(data.userId,data);
			} else if (data.userType === "recruiter") {
				recruiterRepository.updateRecruiterProfile(data.userId, data);
			}

			break;

		case "COMPANY-PROFILE-CREATED-TOPIC":
			
			candidateRepository.createCandidate(data);
			break;

		case "COMPANY-PROFILE-UPDATED-TOPIC":
			candidateRepository.createCandidate(data);
			break;

		case "CANDIDATE-PROFILE-CREATED-TOPIC":
			candidateRepository.createCandidate(data);
			break;

		case "CANDIDATE-PROFILE-UPDATED-TOPIC":
			candidateRepository.updateCandidateProfile(data.userId,data);

			break;

		case "RECRUITER-PROFILE-CREATED-TOPIC":
			recruiterRepository.createRecruiter(data);

			break;

		case "RECRUITER-PROFILE-UPDATED-TOPIC":
			recruiterRepository.updateRecruiterProfile(data.userId, data);

			break;

		case "JOB-CREATED-TOPIC":
			jobRepository.createJob(data);

			break;

		case "JOB-UPDATED-TOPIC":
			jobRepository.updateJob(data.jobId, data);

			break;

		case "JOB-DELETED-TOPIC":
			jobRepository.deleteJob(data.jobId);

			break;

		case "PAYMENT-CREATED-TOPIC":
			paymentRepository.createPayment(data);

			break;

		default:
			break;
	}
};
