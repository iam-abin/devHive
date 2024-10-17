import { CandidateProfileModel } from "../../database/mongo/models/candidate";
import { IResume } from "../../types/candidateProfile";

// we want to export some closure
export = {
	// These fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>
	// CreateCandidateProfile is calling when the user is signed in, and then creates a basic profile
	createCandidateProfile: async (userData: any): Promise<any> => {
		const userObject = CandidateProfileModel.buildCandidate(userData);
		return await userObject.save();
	},

	getProfileByUserId: async (userId: string): Promise<any> => {
		const candidate = await CandidateProfileModel.findById(userId);
		return candidate;
	},

	getProfileByEmail: async (email: string): Promise<any> => {
		const candidate = await CandidateProfileModel.findOne({ email });
		return candidate;
	},

	// updating and block unblocking is also doing here
	updateCandidateProfile: async (profileId: string, data: any): Promise<any> => {
		const candidate = await CandidateProfileModel.findByIdAndUpdate(
			profileId,
			{ $set: data },
			{ new: true }
		);

		return candidate;
	},

	uploadProfilePic: async (profileId: string, profile_image: string): Promise<any> => {
		const candidate = await CandidateProfileModel.findByIdAndUpdate(
			profileId,
			{ $set: { profile_image } },
			{ new: true }
		);

		return candidate;
	},

	uploadResume: async (
		profileId: string, resume: IResume
	): Promise<any> => {
		const candidate = await CandidateProfileModel.findByIdAndUpdate(
			profileId,
			{ $set: { resume } },
			{ new: true }
		);

		return candidate;
	},

	deleteResume: async (userId: string): Promise<any> => {
		const candidate = await CandidateProfileModel.findOneAndUpdate(
			{ _id: userId },
			{ $unset: { resume: null } },
			{ new: true }
		);
		return candidate;
	},

	updateSkills: async (profileId: string, skills: string[]): Promise<any> => {
		const profile = await CandidateProfileModel.findByIdAndUpdate(
			profileId,
			{ $set: { skills } },
			{ new: true }
		);

		return profile;
	},

	updatePreferredJobs: async (
		profileId: string,
		preferredJobs: string[]
	): Promise<any> => {
		const profile = await CandidateProfileModel.findByIdAndUpdate(
			profileId,
			{ $set: { preferredJobs } },
			{ new: true }
		);
		return profile;
	},

	premiumPaymentDone: async (data: {candidateId: string}): Promise<any> => {
		const { candidateId } = data;
		const user = await CandidateProfileModel.findOneAndUpdate(
			{ _id: candidateId },
			{ $set: { isPremiumUser: true } },
			{ new: true }
		);
		return user;
	},

	getAllCandidatesProfiles: async (
		skip: number,
		limit: number
	): Promise<any[]> => {
		const jobs = await CandidateProfileModel.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		return jobs;
	},

	getCountOfCandidatesProfiles: async (): Promise<number> => {
		const totalJobs: number = await CandidateProfileModel.countDocuments();
		return totalJobs;
	},
};

// export default repository();
