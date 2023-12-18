import schemas from "../../database/models"

const { CandidateModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createCandidate: async (userData: any) => {
		console.log("inside createCandidate fn in admin service", userData);
		
		const {name, email, phone, userType, isActive, userId} = userData
		const userObject = CandidateModel.buildCandidate({name, email, phone, userType, isActive, userId});
		return await userObject.save();
	},

	// updating and block unblocking is also doing here
	updateCandidateProfile: async (userId: string, data: any): Promise<any> => {
		const candidate = await CandidateModel.findOneAndUpdate({ "userId": userId }, { $set: data }, {new: true});
		return candidate;
	},

	blockUnblock: async (userId: string) => {
		console.log("blockUnblock repo candidate id", userId);
		
		const candidate = await CandidateModel.findOne({userId});
		if (!candidate) {
			console.log("hi");
			
			throw new Error("Candidate not found");
		}

		candidate.isActive = !candidate.isActive;

		return await candidate.save();
	},

	getById: async (userId: string) => {
		console.log("inside get candidate by userId candidate repo ", userId , typeof userId);
		
		const candidate = await CandidateModel.findOne({userId: userId});
		console.log("candidate found is ", candidate);
		
		return candidate;
	},

	getAllCandidates: async () => {
		const candidates = await CandidateModel.find({});
		return candidates;
	},
};

// export default repository();
