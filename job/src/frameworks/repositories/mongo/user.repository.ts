import Models from "../../database/mongo/models";

const { UserModel } = Models;

export = {
	createUser: async (userData: any) => { 
		const newUser = UserModel.buildUser(userData);
		return await newUser.save();
	},

	updateUser: async (userId: string, data: any): Promise<any> => {
		const user = await UserModel.findOneAndUpdate({ "_id": userId }, { $set: data }, {new: true});
		return user;
	},

	premiumPaymentDone: async (userId: string, data: any): Promise<any> => {
		const user = await UserModel.findOneAndUpdate({ "_id": userId }, { $set: {isPremiumUser: true} }, {new: true});
		return user;
	},

	findUserById: async (userId: string) => {
		const user = await UserModel.findById(userId);
		return user;
	},
	
	filterJob: async (searchText: string,currentUserId: string) => {
		const filteredUsers = await UserModel.find({"name": {$regex: searchText, $options: 'i'} }).find({_id: {$ne: currentUserId}});
		return filteredUsers;
	},

	getAllUsers: async (skip: number, limit: number): Promise<any[]> => {
		const users = await UserModel.find()
		return users;
	},
};
