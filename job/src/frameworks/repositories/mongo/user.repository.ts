import Models from '../../database/mongo/models';
import { IUserDocument } from '../../database/mongo/models/user';
import { IUser } from '../../types/user';

const { UserModel } = Models;

export = {
    createUser: async (userData: IUser): Promise<IUserDocument> => {
        const newUser = UserModel.buildUser(userData);
        return await newUser.save();
    },

    updateUser: async (userId: string, data: Partial<IUser>): Promise<IUserDocument | null> => {
        const user = await UserModel.findByIdAndUpdate(userId, { $set: data }, { new: true });
        return user;
    },

    premiumPaymentDone: async (userId: string): Promise<IUserDocument | null> => {
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { isPremiumUser: true } },
            { new: true },
        );
        return user;
    },

    findUserById: async (userId: string): Promise<IUserDocument | null> => {
        const user = await UserModel.findById(userId);
        return user;
    },

    filterJob: async (searchText: string, currentUserId: string) => {
        const filteredUsers = await UserModel.find({ name: { $regex: searchText, $options: 'i' } }).find({
            _id: { $ne: currentUserId },
        });
        return filteredUsers;
    },
};
