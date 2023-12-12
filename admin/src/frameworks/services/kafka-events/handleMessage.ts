import candidateRepository from "../../repositories/mongo/candidateRepository";
import recruiterRepository from "../../repositories/mongo/recruiterRepository";

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		case "USER-CREATED-TOPIC":
			console.log("admin handleMessage createUserTopic", data);

			if (data.userType === "candidate") {
				candidateRepository.createCandidate(data);
			} else if (data.userType === "recruiter") {
				recruiterRepository.createRecruiter(data);
			}

			break;

		case "USER-UPDATED-TOPIC":
			console.log("admin handleMessage createUserTopic", data);

			if (data.userType === "candidate") {
				candidateRepository.createCandidate(data);
			} else if (data.userType === "recruiter") {
				recruiterRepository.createRecruiter(data);
			}

			break;

		case "COMPANY-PROFILE-CREATED-TOPIC":
			console.log("admin handleMessage companyProfileCreatedTopic", data);
			candidateRepository.createCandidate(data);

			break;

		case "COMPANY-PROFILE-UPDATED-TOPIC":
			console.log("admin handleMessage companyProfileUpdatedTopic", data);
			candidateRepository.createCandidate(data);

			break;

		case "CANDIDATE-PROFILE-CREATED-TOPIC":
			console.log("admin handleMessage companyProfileCreatedTopic", data);
			candidateRepository.createCandidate(data);

			break;

		case "CANDIDATE-PROFILE-UPDATED-TOPIC":
			console.log("admin handleMessage companyProfileUpdatedTopic", data);
			candidateRepository.createCandidate(data);

			break;

		case "RECRUITER-PROFILE-CREATED-TOPIC":
			console.log("admin handleMessage companyProfileCreatedTopic", data);
			candidateRepository.createCandidate(data);

			break;

		case "RECRUITER-PROFILE-UPDATED-TOPIC":
			console.log("admin handleMessage companyProfileUpdatedTopic", data);
			candidateRepository.createCandidate(data);

			break;

		case "JOB-CREATED-TOPIC":
			console.log("admin handleMessage jobCreatedTopic", data);
			candidateRepository.createCandidate(data);

			break;

		case "JOB-UPDATED-TOPIC":
			console.log("admin handleMessage jobUpdatedTopic", data);
			candidateRepository.createCandidate(data);

			break;

		default:
			break;
	}
};
