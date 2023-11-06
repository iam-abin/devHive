import schemas from "../../database/models"
import { blockUnBlockInterface } from "../../types/candidateInterface";

const { CandidateModel } = schemas;

// we want to export some closure
export = {

	 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	 createCandidate: async (userData: any) => {
		console.log("inside createCandidate fn in admin service", userData);
		
		const {name, email, phone, userType, isActive} = userData
		const userObject = new CandidateModel({name, email, phone, userType, isActive});
		return await userObject.save();
	},

	blockUnblock: async ({ id }: blockUnBlockInterface) => {
		const candidate = await CandidateModel.findById(id);
		if (!candidate) {
			throw new Error("Candidate not found");
		}

		candidate.isActive = !candidate.isActive;

		return await candidate.save();
	},

	getById: async (id: string) => {
		const candidate = await CandidateModel.findById(id);
		return candidate;
	},

	getAllCandidates: async () => {
		const candidates = await CandidateModel.find({});
		return candidates;
	},
};

// export default repository();
