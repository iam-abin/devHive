import schemas from "../../database/models"
import { blockUnBlockInterface } from "../../types/candidateInterface";

const { RecruiterModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createRecruiter: async (userData: any) => {
		console.log("inside createRecruiter fn in admin service", userData);
		
		const {name, email, phone, userType, isActive} = userData
		const userObject = new RecruiterModel({name, email, phone, userType, isActive});
		return await userObject.save();
	},

	// updating and block unblocking is also doing here
	updateRecruiterProfile: async (userId: string, data: any): Promise<any> => {
		const recruiter = await RecruiterModel.findOneAndUpdate({ "userId": userId }, { $set: data }, {new: true});
		return recruiter;
	},

	blockUnblock: async ({ id }: blockUnBlockInterface) => {
		const recruiter = await RecruiterModel.findById(id);
		if (!recruiter) {
			throw new Error("recruiter not found");
		}

		recruiter.isActive = !recruiter.isActive;

		return await recruiter.save();
	},

	getById: async (id: string) => {
		const recruiter = await RecruiterModel.findById(id);
		return recruiter;
	},

	getAllRecruiters: async () => {
		const recruiters = await RecruiterModel.find({});
		return recruiters;
	},
};

// export default repository();
