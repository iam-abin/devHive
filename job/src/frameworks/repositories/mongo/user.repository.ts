import schemas from "../../database/mongo/models";

const { UserModel } = schemas;

export = {
	createUser: async (userData: any) => {
		console.log("user repository userData", userData);

		const newUser = UserModel.buildUser(userData);
		console.log(newUser);
		return await newUser.save();
	},

	updateUser: async (userId: string, data: any): Promise<any> => {
		const user = await UserModel.findOneAndUpdate({ "_id": userId }, { $set: data }, {new: true});
		return user;
	},

	findUserById: async (userId: string) => {
		console.log("inside get user by userId repo ", userId , typeof userId);
		
		const user = await UserModel.findById(userId);
		console.log("User found is ", user);
		
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
