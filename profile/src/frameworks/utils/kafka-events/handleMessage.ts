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
			console.log("admin handleMessage createUserTopic", data);

			if (data.userType === "candidate") {
				candidateProfileRepository.createCandidateProfile(data);
			} else if (data.userType === "recruiter") {
				recruiterProfileRepository.createRecruiterProfile(data);
			}

			break;

		case "USER-UPDATED-TOPIC":
			console.log("admin handleMessage UpdateUserTopic", data);

			if (data.userType === "candidate") {
				candidateProfileRepository.updateCandidateProfile(
					data.userId,
					data
				);
			} else if (data.userType === "recruiter") {
				recruiterProfileRepository.updateRecruiterProfile(
					data.userId,
					data
				);
			}
			//  else {
			// 	companyProfileRepository.createCompanyProfile(data);
			// }

			break;

		case "PAYMENT-CREATED-TOPIC":
			console.log("handleMessage payment premium topic data", data);
			candidateProfileRepository.premiumPaymentDone(data);

			break;
			
		default:
			break;
	}
};
