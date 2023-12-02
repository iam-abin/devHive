import schemas from "../../database/mongo/models"
// import { blockUnBlockInterface } from "../../types/candidateInterface";

const { CompanyProfileModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createCandidate: async (userData: any) => {
		console.log("inside createCandidate fn in admin service", userData);
		
		const {name, email, phone, userType, isActive} = userData
		const userObject = new CompanyProfileModel({name, email, phone, userType, isActive});
		return await userObject.save();
	},

	getById: async (id: string) => {
		const candidate = await CompanyProfileModel.findById(id);
		return candidate;
	},

	getAllCandidates: async () => {
		const candidates = await CompanyProfileModel.find({});
		return candidates;
	},
};

// export default repository();
