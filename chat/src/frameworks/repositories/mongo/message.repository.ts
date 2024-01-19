import schemas from "../../database/mongo/models";

const { MessageModel, ChatRoomModel } = schemas;

export = {
	createChatRoom: async (data: any) => {
		let arr = [];
		arr.push(data.senderId);
		arr.push(data.receiverId);
		const chatRoom = await ChatRoomModel.create();
		console.log("in applyJob repository");

		return chatRoom;
	},

	createMessage: async (message: any)=>{
		
		return 
	},

	getChatMessages: async (roomId: string) => {
		const chatMessages = await MessageModel.findOne({
			roomId: roomId,
		});
		return chatMessages;
	},

	getAllChatRoomsByUserId: async (userId: string) => {
		const chatRooms = await ChatRoomModel.find({
			users: { $elemMatch: { $eq: userId } },
		});
		return chatRooms;
	},

	// getAllAppliedJobsByCandidateId: async (
	// 	id: string,
	// 	skip: number,
	// 	limit: number
	// ) => {
	// 	// use populate
	// 	const appliedJobs = await jobApplicationModel
	// 		.find({ candidateId: id })
	// 		.populate({ path: "jobId", model: JobModel })
	// 		.sort({ createdAt: -1 })
	// 		.skip(skip)
	// 		.limit(limit);
	// 	console.log(appliedJobs);
	// 	return appliedJobs;
	// },

	// getCountOfCandidateAppliedJobs: async (id: string): Promise<number> => {
	// 	const totalJobs: number = await jobApplicationModel.countDocuments({candidateId: id})
	//     console.log(totalJobs);
	//     return totalJobs
	// },

	// updateJobApplicationStatus: async (id: string, status: object) => {
	// 	const updatedJob = await jobApplicationModel.findOneAndUpdate(
	// 		{ _id: id },
	// 		{ $set: status },
	// 		{ new: true }
	// 	);
	// 	return updatedJob;
	// },

	// getAJobApplicationByRecruiter: async (jobApplicationId: string) => {
	// 	// use populate
	// 	const jobApplications = await jobApplicationModel
	// 		.findOne({ _id: jobApplicationId })
	// 		.populate({ path: "jobId", model: JobModel });
	// 	console.log("in getAllJobApplicationsByRecruiterId", jobApplications);

	// 	return jobApplications;
	// },

	// getAnAppliedJobByCandidate: async (
	// 	candidateId: string,
	// 	jobApplicationId: string
	// ) => {
	// 	// use populate
	// 	console.log(
	// 		"in getAnAppliedJobByCandidate1 jobApplicationId",
	// 		jobApplicationId
	// 	);
	// 	console.log("in getAnAppliedJobByCandidate1 candidateId", candidateId);

	// 	const jobApplication = await jobApplicationModel
	// 		.findOne({ jobId: jobApplicationId, candidateId })
	// 		.populate({ path: "jobId", model: JobModel });
	// 	console.log("in getAnAppliedJobByCandidate2", jobApplication);

	// 	return jobApplication;
	// },
};
