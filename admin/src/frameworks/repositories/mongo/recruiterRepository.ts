import schemas from "../../database/models"

const { RecruiterModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createRecruiter: async (userData: any) => {
		console.log("inside createRecruiter fn in admin service", userData);
		
		const {name, email, phone, userType, isActive, userId} = userData
		const userObject = RecruiterModel.buildRecruiter({name, email, phone, userType, isActive, userId});
		console.log("in create Recruiter in admin>><<><><><", userObject);

		return await userObject.save();
	},

	// updating and block unblocking is also doing here
	updateRecruiterProfile: async (userId: string, data: any): Promise<any> => {
		console.log("in update Recruiter Profile before update in admin>><<><><><", userId);
		console.log("in update Recruiter Profile before update in admin>><<><><><", data);
		const recruiter = await RecruiterModel.findOneAndUpdate({ "_id": userId }, { $set: data }, {new: true});
		console.log("in update Recruiter Profile in admin>><<><><><", recruiter);
		
		return recruiter;
	},

	blockUnblock: async (userId: string) => {
		console.log("blockUnblock repo recruiter userId", userId);

		const recruiter = await RecruiterModel.findById(userId)
		if (!recruiter) {
			throw new Error("recruiter not found");
		}

		recruiter.isActive = !recruiter.isActive;

		return await recruiter.save();
	},

	getById: async (userId: string) => {
		console.log(" in getRecruiterById useCase", userId);
		const recruiter = await RecruiterModel.findById(userId)
		console.log("recruiter found is ", recruiter);
		return recruiter;
	},

	getAllRecruiters: async () => {
		const recruiters = await RecruiterModel.find({});
		return recruiters;
	},
};

// export default repository();
