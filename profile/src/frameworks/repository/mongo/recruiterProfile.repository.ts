import models from '../../database/mongo/models';
import { IRecruiterDocument } from '../../database/mongo/models/recruiter';
import { IRecruiterProfile } from '../../types/recruiter';
import { IUser } from '../../types/user';

const { RecruiterProfileModel } = models;

// we want to export some closure
export = {
    // These fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>
    // CreateRecruiterProfile is calling when the user is signed in, and then creates a basic profile

    createRecruiterProfile: async (userData: IUser): Promise<IRecruiterDocument> => {
        const userObject = RecruiterProfileModel.buildRecruiter(userData);
        return await userObject.save();
    },

    getProfileByUserId: async (userId: string): Promise<IRecruiterDocument | null> => {
        const recruiter = await RecruiterProfileModel.findById(userId);
        return recruiter;
    },

    // updating and block unblocking is also doing here
    updateRecruiterProfile: async (
        profileId: string,
        data: Partial<IRecruiterProfile>,
    ): Promise<IRecruiterDocument | null> => {
        const recruiter = await RecruiterProfileModel.findByIdAndUpdate(
            profileId,
            { $set: data },
            { new: true },
        );
        return recruiter;
    },

    getCandidateResume: async (id: string): Promise<IRecruiterDocument | null> => {
        const candidate = await RecruiterProfileModel.findById(id);
        return candidate;
    },
};

// export default repository();
