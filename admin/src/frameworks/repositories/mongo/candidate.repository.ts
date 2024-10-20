import { CandidateModel, ICandidateDocument } from "../../database/models";
import { ICandidate, IUser } from "../../types/user";

export = {
    // these fn's are returning a promise as async so we can define return type as Promise<ICandidateData>

    createCandidate: async (
        userData: IUser
    ): Promise<Partial<ICandidateDocument>> => {
        const candidate = CandidateModel.buildCandidate(userData);
        return await candidate.save();
    },

    // updating and block unblocking is also doing here
    updateCandidateProfile: async (
        userId: string,
        data: Partial<ICandidate>
    ): Promise<Partial<ICandidateDocument> | null> => {
        const candidate = await CandidateModel.findByIdAndUpdate(
            userId,
            { $set: data },
            { new: true }
        );

        return candidate;
    },

    blockUnblock: async (userId: string): Promise<ICandidateDocument> => {
        const candidate = await CandidateModel.findById(userId);
        if (!candidate) throw new Error("Candidate not found");

        candidate.isActive = !candidate.isActive;

        return await candidate.save();
    },

    getById: async (userId: string): Promise<ICandidateDocument | null> => {
        return await CandidateModel.findById(userId);
    },

    getAllCandidates: async () => {
        return await CandidateModel.find({}).select([
            "name",
            "email",
            "phone",
            "isActive",
        ]);
    },

    numberOfCandidates: async () => {
        const totalCandidates = await CandidateModel.countDocuments();
        return totalCandidates;
    },
};
