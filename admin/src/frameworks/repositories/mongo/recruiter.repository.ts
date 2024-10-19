import { RecruiterModel, IRecruiterDocument } from "../../database/models";
import { IRecruiter, IUser } from "../../types/user";

export = {
    // these fn's are returning a promise as async so we can define return type as Promise<ICandidateData>

    createRecruiter: async (userData: IUser): Promise<IRecruiterDocument> => {
        const recruiter = RecruiterModel.buildRecruiter(userData);
        return await recruiter.save();
    },

    // updating and block unblocking is also doing here
    updateRecruiterProfile: async (
        userId: string,
        data: Partial<IRecruiter>
    ): Promise<IRecruiterDocument | null> => {
        const recruiter = await RecruiterModel.findByIdAndUpdate(
            userId,
            { $set: data },
            { new: true }
        );
        return recruiter;
    },

    blockUnblock: async (
        userId: string
    ): Promise<IRecruiterDocument | null> => {
        const recruiter = await RecruiterModel.findById(userId);
        if (!recruiter) throw new Error("recruiter not found");

        recruiter.isActive = !recruiter.isActive;

        return await recruiter.save();
    },

    getById: async (userId: string): Promise<IRecruiterDocument | null> => {
        return await RecruiterModel.findById(userId);
    },

    getAllRecruiters: async (): Promise<IRecruiterDocument[] | []> => {
        return await RecruiterModel.find({}).select([
            "name",
            "email",
            "phone",
            "isActive",
        ]);
    },

    numberOfRecruiters: async (): Promise<number> => {
        const count = await RecruiterModel.countDocuments();
        return count;
    },
};
