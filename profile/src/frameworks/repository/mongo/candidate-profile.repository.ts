import schemas from "../../database/mongo/models"

const { CandidateProfileModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 // createCandidateProfile is calling when the user is signed in, and then creates a basic profile
	 createCandidateProfile: async (userData: any): Promise<any> => {
		console.log("inside createCandidate fn in  profile service", userData);
		const userObject = CandidateProfileModel.buildCandidate(userData);
		return await userObject.save();
	},


	getProfileByUserId: async (userId: string): Promise<any> => {
		console.log("in getProfileByuserId repository");
		
		const candidate = await CandidateProfileModel.findOne({userId});
		return candidate;
	},

	getProfileByEmail: async (email: string): Promise<any> => {
		const candidate = await CandidateProfileModel.findOne({email});
		return candidate;
	},

	// updating and block unblocking is also doing here
	updateCandidateProfile: async (id: string, data: any): Promise<any> => {
		console.log("user update candidate repo----");
		
		const candidate = await CandidateProfileModel.findOneAndUpdate({ "userId": id }, { $set: data }, {new: true});
		return candidate;
	},

	uploadProfilePic : async (id: string, url: string): Promise<any>=>{
		const candidate = await CandidateProfileModel.updateOne({ "_id": id }, { $set:{ resume: url }});
		return candidate;
	},


	uploadResume: async (id: string, url: string): Promise<any>=>{
		const candidate = await CandidateProfileModel.updateOne({ "_id": id }, { $set:{ profile_image: url }});
		return candidate;
	}

	
};

// export default repository();
