import candidateProfileRepository from "../../repository/mongo/candidateProfile.repository";
import recruiterProfileRepository from "../../repository/mongo/recruiter-profile.repository";
import { KafkaMessage } from "kafkajs";

export const handleMessage = (data: any, topic: string, message: KafkaMessage) => {
	switch (topic) {

		case "USER-CREATED-TOPIC":
			if (data.role === "candidate") {
				candidateProfileRepository.createCandidateProfile(data);
			} else if (data.role === "recruiter") {
				recruiterProfileRepository.createRecruiterProfile(data);
			}
			break;

		case "USER-UPDATED-TOPIC": 
			if (data.role === "candidate") {
				candidateProfileRepository.updateCandidateProfile(
					data.userId,
					data
				);
			} else if (data.role === "recruiter") {
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
