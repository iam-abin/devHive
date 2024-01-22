import schemas from "../../database/mongo/models";

const { MessageModel, ChatRoomModel } = schemas;

export = {
	createChatRoom: async (sender: string, recipient: string) => {
		let arr = [];
		arr.push(sender);
		arr.push(recipient);
		const chatRoom = ChatRoomModel.buildChatRoom(arr);
		console.log("in applyJob repository");

		return await chatRoom.save();
	},

    getAChatRoom: async (sender: string, recipient: string) => {
        const chatRooms = await ChatRoomModel.find({
          users: { $all: [sender, recipient] },
        });
        return chatRooms;
      },

	getAllChatRoomsByUserId: async (userId: string) => {
		const chatRooms = await ChatRoomModel.find({
			users: { $elemMatch: { $eq: userId } }
		})
		// .populate('users');
		console.log("in getAllChatRoomsByUserId repository ", chatRooms);
		
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
