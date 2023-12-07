import schemas from "../../database/mongo/models"

const { CandidateProfileModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 // createCandidateProfile is calling when the user is signed in, and then creates a basic profile
	 createCandidateProfile: async (userData: any) => {
		console.log("inside createCandidate fn in  profile service", userData);
		const userObject = CandidateProfileModel.buildCandidate(userData);
		return await userObject.save();
	},


	getProfileByCandidateId: async (candidateId: string) => {
		const candidate = await CandidateProfileModel.findOne({candidateId});
		return candidate;
	},

	getProfileByEmail: async (email: string) => {
		const candidate = await CandidateProfileModel.findOne({email});
		return candidate;
	},


	updateCandidateProfile: async (id: string, data: any) => {
		const candidate = await CandidateProfileModel.findOneAndUpdate({ "_id": id }, { $set: data }, {new: true});
		return candidate;
	},

	uploadProfilePic : async (id: string, data: any)=>{
		const candidate = await CandidateProfileModel.updateOne({ "_id": id }, { $set:{ resume: data }});
		return candidate;
	},


	uploadResume: async (id: string, data: any)=>{
		const candidate = await CandidateProfileModel.updateOne({ "_id": id }, { $set:{ profile_image: data }});
		return candidate;
	}

	
};

// export default repository();
