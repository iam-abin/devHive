import schemas from "../../database/mongo/models"

const { RecruiterProfileModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 // createRecruiterProfile is calling when the user is signed in, and then creates a basic profile

	 createRecruiterProfile: async (userData: any) => {
		console.log("inside createRecruiter fn in admin service", userData);
		
		const {name, email, phone, userType, isActive} = userData
		const userObject = new RecruiterProfileModel({name, email, phone, userType, isActive});
		return await userObject.save();
	},

	getProfileById: async (id: string) => {
		const recruiter = await RecruiterProfileModel.findById(id);
		return recruiter;
	},

	updateRecruiterProfile: async (id: string, data: any) => {
		const recruiter = await RecruiterProfileModel.updateOne({ "_id": id }, { $set: data });
		return recruiter;
	},

	uploadProfilePic : async (id: string, data: any)=>{
		const recruiter = await RecruiterProfileModel.updateOne({ "_id": id }, { $set:{ resume: data }});
		return recruiter;
	},


	getCandidateResume: async (id: string)=>{
		const candidate = await RecruiterProfileModel.findById(id)
		return candidate;
	}
	
};

// export default repository();
