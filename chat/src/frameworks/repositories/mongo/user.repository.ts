import schemas from "../../database/mongo/models";

const { UserModel } = schemas;

export = {
	// createJob: async (jobData: any) => {
	// 	console.log("job repository jobData", jobData);

	// 	const newJob = JobModel.buildJob(jobData);
	// 	console.log(newJob);
	// 	return await newJob.save();
	// },

	// deleteJob: async (jobId: string) => {
	// 	const deletedJob = await JobModel.deleteOne({ _id: jobId });
	// 	console.log("deletedJob: ", deletedJob);
	// 	return deletedJob;
	// },

	// updateJob: async (jobId: string, data: object) => {
	// 	console.log("in updateJob repository jobId", jobId, " data ", data);

	// 	const updatedJob = await JobModel.findOneAndUpdate(
	// 		{ _id: jobId },
	// 		{ $set: data },
	// 		{ new: true }
	// 	);
	// 	// const updatedJob = await JobModel.findOneAndUpdate({ "_id": jobId }, { $set: data }, {new: true});
	// 	console.log("in updateJob repository after update", updatedJob);
	// 	return updatedJob;
	// },
	// findUserById(sender)
	findUserById: async (userId: string) => {
		console.log("inside get user by userId repo ", userId , typeof userId);
		
		const user = await UserModel.findOne({userId: userId});
		console.log("User found is ", user);
		
		return user;
	},
	
	filterJob: async (searchText: string,currentUserId: string) => {
		const filteredUsers = await UserModel.find({"name": {$regex: searchText, $options: 'i'} }).find({_id: {$ne: currentUserId}});
		return filteredUsers;
	},

	getAllUsers: async (skip: number, limit: number): Promise<any[]> => {
		const users = await UserModel.find()
		return users;
	},

	// getAllJobsDistinctValues: async (): Promise<any> => {
	// 	// const jobs = await JobModel.aggregate([{ $sort: { createdAt: 1 } }]);
	// 	const fields = ['title', 'location', 'employment_type'];

	// 	// Get distinct values for the specified fields
	// 	const distinctValues: any = {};
	// 	for (const field of fields) {
	// 	  distinctValues[field] = await JobModel.distinct(field);
	// 	}

	// 	console.log(distinctValues);
		
	// 	return distinctValues;
	// },

	// getAllJobsByRecruiterId: async (id: string): Promise<any[]> => {
	// 	const jobs = await JobModel.find({ recruiterId: id }).sort({
	// 		createdAt: -1,
	// 	});
	// 	console.log(jobs);
	// 	return jobs;
	// },

	// getCountOfJobs: async (): Promise<number> => {
	// 	const totalJobs: number = await JobModel.countDocuments();
	// 	console.log(totalJobs);
	// 	return totalJobs;
	// },

	// getAJob: async (id: string) => {
	// 	console.log(id, "in job repository");

	// 	const job = await JobModel.findById(id);
	// 	return job;
	// },
};
