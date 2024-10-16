import {RecruiterModel, IRecruiterDocument} from "../../database/models"
import { IUser } from "../../types/candidateInterface";


export = {

	 // these fn's are returning a promise as async so we can define return type as Promise<ICandidateData>

	 createRecruiter: async (userData: IUser): Promise<IRecruiterDocument> => {
		const recruiter = RecruiterModel.buildRecruiter(userData);
        return await recruiter.save();
	},

	// updating and block unblocking is also doing here
	updateRecruiterProfile: async (userId: string, data: Partial<IUser>): Promise<IRecruiterDocument | null> => {
		const recruiter = await RecruiterModel.findByIdAndUpdate(userId, { $set: data }, {new: true});
		return recruiter;
	},

	blockUnblock: async (userId: string): Promise<IRecruiterDocument | null> => {
		
		const recruiter = await RecruiterModel.findById(userId)
		if (!recruiter) throw new Error("recruiter not found");

		recruiter.isActive = !recruiter.isActive;

		return await recruiter.save();
	},

	getById: async (userId: string): Promise<IRecruiterDocument | null> => {
		const recruiter = await RecruiterModel.findById(userId)
		return recruiter;
	},

	getAllRecruiters: async (): Promise<IRecruiterDocument[] | []> => {
		const recruiters = await RecruiterModel.find({});
		return recruiters;
	},

	numberOfRecruiters: async (): Promise<number>=>{
		const totalRecruiters = await RecruiterModel.countDocuments()
		return totalRecruiters
	},
};
