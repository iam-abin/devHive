import schemas from "../../database/mongo/models"

const { CandidateProfileModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

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

	updateCandidateProfile: async (id: string) => {
		const candidates = await CandidateProfileModel.updateOne({id});
		return candidates;
	},
};

// export default repository();
