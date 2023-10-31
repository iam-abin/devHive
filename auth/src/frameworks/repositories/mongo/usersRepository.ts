import schemas from "../../database/mongo/models";
import { UpdatePasswordInput } from "../../types/userInterface";

const { UserModel } = schemas;

// we want to export some closure
const repository = () => {

	return {
		register: async (userData:any) => {
			const userObject = new UserModel(userData);
			return userObject.save();
		},

		updatePassword: async ({ id , newPassword}: UpdatePasswordInput) => {

			const user = await UserModel.findByIdAndUpdate(id, {password: newPassword},{new: true})
			
			if(!user){
				throw new Error("User not found")
			}

			return user

		},

		getByEmail: async (email: string) => {
			const user = await UserModel.findOne({email: email});
			return user
		},

		// getById: async (id: string) => {
		// 	const user = await UserModel.findByIdAndUpdate(id, {password})
		// },
	};
};

export default repository();
