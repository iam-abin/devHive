import candidateProfileRepository from "../../repository/mongo/candidate-profile.repository";
import recruiterProfileRepository from "../../repository/mongo/recruiter-profile.repository";
import companyProfileRepository from "../../repository/mongo/company-profile.repository";

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {

		case "USER-CREATED-TOPIC":
			if (data.userType === "candidate") {
				candidateProfileRepository.createCandidateProfile(data);
			} else if (data.userType === "recruiter") {
				recruiterProfileRepository.createRecruiterProfile(data);
			}
			break;

		case "USER-UPDATED-TOPIC": 
			if (data.userType === "candidate") {
				candidateProfileRepository.updateCandidateProfile(
					data.id,
					data
				);
			} else if (data.userType === "recruiter") {
				recruiterProfileRepository.updateRecruiterProfile(
					data.userId,
					data
				);
			}
			break;

		case "PAYMENT-CREATED-TOPIC":
			candidateProfileRepository.premiumPaymentDone(data);
			break;
			
		default:
			break;
	}
};
