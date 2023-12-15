import schemas from "../../database/models"
import { blockUnBlockInterface } from "../../types/candidateInterface";

const { RecruiterModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createRecruiter: async (userData: any) => {
		console.log("inside createRecruiter fn in admin service", userData);
		
		const {name, email, phone, userType, isActive, userId} = userData
		const userObject = RecruiterModel.buildRecruiter({name, email, phone, userType, isActive, userId});
		return await userObject.save();
	},

	// updating and block unblocking is also doing here
	updateRecruiterProfile: async (userId: string, data: any): Promise<any> => {
		const recruiter = await RecruiterModel.findOneAndUpdate({ "userId": userId }, { $set: data }, {new: true});
		return recruiter;
	},

	blockUnblock: async ({ id }: blockUnBlockInterface) => {
		console.log("blockUnblock repo recruiter id", id);

		const recruiter = await RecruiterModel.findOne({userId: id});
		if (!recruiter) {
			throw new Error("recruiter not found");
		}

		recruiter.isActive = !recruiter.isActive;

		return await recruiter.save();
	},

	getById: async (userId: string) => {
		console.log(" in getRecruiterById useCase", userId);
		const recruiter = await RecruiterModel.findOne({userId})
		return recruiter;
	},

	getAllRecruiters: async () => {
		const recruiters = await RecruiterModel.find({});
		return recruiters;
	},
};

// export default repository();
