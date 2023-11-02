import schemas from "../../database/models"
import { blockUnBlockInterface } from "../../types/candidateInterface";

const { CandidateModel } = schemas;

// we want to export some closure
export default {

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
