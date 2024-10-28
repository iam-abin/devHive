import Models from '../../database/mongo/models';
import { IUserDocument } from '../../database/mongo/models/users';
import { ISignup, IUpdatePassword } from '../../types/user';

const { UserModel } = Models;

// we want to export some closure
// const repository = () => {
// 	return {
export = {
    register: async (userData: ISignup): Promise<IUserDocument> => {
        const userObject = UserModel.buildUser(userData);
        return await userObject.save();
    },

    updatePassword: async ({ userId, password }: IUpdatePassword): Promise<IUserDocument | null> => {
        const user = await UserModel.findByIdAndUpdate(userId, { password }, { new: true });
        return user;
    },

    getByEmail: async (email: string): Promise<IUserDocument | null> => {
        const user = await UserModel.findOne({ email });

        return user;
    },

    getByPhone: async (phone: number): Promise<IUserDocument | null> => {
        const user = await UserModel.findOne({ phone });
        return user;
    },

    // "setOtp" using only in forgot password email otp
    setOtp: async (email: string, otp: number): Promise<IUserDocument | null> => {
        const result = await UserModel.findOneAndUpdate({ email }, { $set: { otp: otp } }, { new: true });

        return result;
    },

    deleteOtp: async (email: string): Promise<IUserDocument | null> => {
        const result = await UserModel.findOneAndUpdate({ email }, { $unset: { otp: '' } }, { new: true });

        if (!result) throw new Error('User not found');

        return result;
    },

    // user status is updated only by 'admin'
    updateUser: async (userId: string, data: Partial<ISignup>): Promise<IUserDocument | null> => {
        const user = await UserModel.findByIdAndUpdate(userId, { $set: data }, { new: true });
        return user;
    },

    updateVerification: async (email: string): Promise<IUserDocument | null> => {
        console.log("inside updateverification repo email ", email);
        
        const user = await UserModel.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
        console.log("inside updateverification repo use ", user);
        return user;
    },
};
// };

// export default repository();
