import Models from "../../database/models"

const { RecruiterModel } = Models;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can define return type as Promise<ICandidateData>

	 createRecruiter: async (userData: any) => {
		const {name, email, phone, role, isActive, userId} = userData
		const userObject = RecruiterModel.buildRecruiter({name, email, phone, role, isActive, userId});

		return await userObject.save();
	},

	// updating and block unblocking is also doing here
	updateRecruiterProfile: async (userId: string, data: any): Promise<any> => {
		const recruiter = await RecruiterModel.findOneAndUpdate({ "_id": userId }, { $set: data }, {new: true});
		
		return recruiter;
	},

	blockUnblock: async (userId: string) => {
		
		const recruiter = await RecruiterModel.findById(userId)
		if (!recruiter) {
			throw new Error("recruiter not found");
		}

		recruiter.isActive = !recruiter.isActive;

		return await recruiter.save();
	},

	getById: async (userId: string) => {
		const recruiter = await RecruiterModel.findById(userId)
		return recruiter;
	},

	getAllRecruiters: async () => {
		const recruiters = await RecruiterModel.find({});
		return recruiters;
	},

	numberOfRecruiters: async ()=>{
		const totalRecruiters = await RecruiterModel.countDocuments()
		return totalRecruiters
	},
};

// export default repository();
