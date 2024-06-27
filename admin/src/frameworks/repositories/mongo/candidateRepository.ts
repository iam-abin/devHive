import Models from "../../database/models";

const { CandidateModel } = Models;

// we want to export some closure
export = {
	// these fn's are returning a promise as async so we can define return type as Promise<ICandidateData>

	createCandidate: async (userData: any) => {
		const { name, email, phone, userType, isActive, userId } = userData;

		const userObject = CandidateModel.buildCandidate({
			name,
			email,
			phone,
			userType,
			isActive,
			userId,
		});

		return await userObject.save();
	},

	// updating and block unblocking is also doing here
	updateCandidateProfile: async (userId: string, data: any): Promise<any> => {
		const candidate = await CandidateModel.findOneAndUpdate(
			{ _id: userId },
			{ $set: data },
			{ new: true }
		);

		return candidate;
	},

	blockUnblock: async (userId: string) => {
		const candidate = await CandidateModel.findById(userId);
		if (!candidate) throw new Error("Candidate not found");

		candidate.isActive = !candidate.isActive;

		return await candidate.save();
	},

	getById: async (userId: string) => {
		const candidate = await CandidateModel.findById(userId);

		return candidate;
	},

	getAllCandidates: async () => {
		const candidates = await CandidateModel.find({});
		return candidates;
	},

	numberOfCandidates: async () => {
		const totalCandidates = await CandidateModel.countDocuments();
		return totalCandidates;
	},
};

// export default repository();
