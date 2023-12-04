// import candidateRepository from "../repositories/mongo/candidateRepository";
// import recruiterRepository from "../repositories/mongo/recruiterRepository"

// interface handleMessageInterface {
// 	parsedObject: any;
// 	topic: string;
// }

// export const handleMessage = ({ topic, parsedObject: data }: handleMessageInterface) => {
// 	switch (topic) {
// 		case "USER_CREATED_TOPIC":
// 			console.log("admin handleMessage createUserTopic",data);
			
// 			if(data.userType === "candidate"){
// 				candidateRepository.createCandidate(data)
// 			}else if(data.userType === "recruiter"){
// 				recruiterRepository.createRecruiter(data)
// 			}
			
// 			break;
// 		default:
// 			break;
// 	}
// };
