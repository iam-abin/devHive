import schemas from "../../database/mongo/models"

const { CandidateProfileModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 // createCandidateProfile is calling when the user is signed in, and then creates a basic profile
	 createCandidateProfile: async (userData: any) => {
		console.log("inside createCandidate fn in admin service", userData);
		
		const {name, email, phone, userType, isActive} = userData
		const userObject = new CandidateProfileModel({name, email, phone, userType, isActive});
		return await userObject.save();
	},


	getProfileById: async (id: string) => {
		const candidate = await CandidateProfileModel.findById(id);
		return candidate;
	},

	updateCandidateProfile: async (id: string, data: any) => {
		const candidate = await CandidateProfileModel.updateOne({ "_id": id }, { $set: data });
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
