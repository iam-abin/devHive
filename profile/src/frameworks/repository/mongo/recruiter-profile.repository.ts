import models from "../../database/mongo/models";

const { RecruiterProfileModel } = models;

// we want to export some closure
export = {
	// These fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>
	// CreateRecruiterProfile is calling when the user is signed in, and then creates a basic profile

	createRecruiterProfile: async (userData: any): Promise<any> => {
		const userObject = RecruiterProfileModel.buildRecruiter(userData);
		return await userObject.save();
	},

	getProfileByUserId: async (userId: string): Promise<any> => {
		const recruiter = await RecruiterProfileModel.findById(userId);
		return recruiter;
	},

	getProfileByEmail: async (email: string): Promise<any> => {
		const candidate = await RecruiterProfileModel.findOne({ email });
		return candidate;
	},

	// updating and block unblocking is also doing here
	updateRecruiterProfile: async (id: string, data: any): Promise<any> => {
		const recruiter = await RecruiterProfileModel.findOneAndUpdate(
			{ _id: id },
			{ $set: data },
			{ new: true }
		);
		return recruiter;
	},

	uploadProfilePic: async (id: string, data: any): Promise<any> => {
		const recruiter = await RecruiterProfileModel.updateOne(
			{ _id: id },
			{ $set: { resume: data } }
		);
		return recruiter;
	},

	getCandidateResume: async (id: string): Promise<any> => {
		const candidate = await RecruiterProfileModel.findById(id);
		return candidate;
	},
};

// export default repository();
