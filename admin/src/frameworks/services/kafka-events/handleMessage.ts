import candidateRepository from "../../repositories/mongo/candidateRepository";
import recruiterRepository from "../../repositories/mongo/recruiterRepository"; 

// interface handleMessageInterface {
// 	data: any;
// 	message: string;
// }

export const handleMessage = (data: any, topic: string ,message: any) => {
	switch (topic) {
		case "USER-CREATED-TOPIC":
			console.log("admin handleMessage createUserTopic",data);
			
			if(data.userType === "candidate"){
				candidateRepository.createCandidate(data)
			}else if(data.userType === "recruiter"){
				recruiterRepository.createRecruiter(data)
			}
			
			break;
		default:
			break;
	}
};
