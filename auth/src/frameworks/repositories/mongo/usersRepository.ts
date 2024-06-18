import Models from "../../database/mongo/models";
import { IUpdatePasswordInput, IUserDataSignup } from "../../types/userInterface";

const { UserModel } = Models;

// we want to export some closure
// const repository = () => {
// 	return {
export = {
	// these fn's are returning a promise as async so we can define return type as Promise<CandidateDataInterface>

	register: async (userData: IUserDataSignup): Promise<any> => {
		const userObject = UserModel.buildUser(userData);
		return await userObject.save();
	},

	updatePassword: async ({
		id,
		password,
	}: IUpdatePasswordInput): Promise<any> => {
		const user = await UserModel.findById(id);

		if (!user) {
			throw new Error("User not found");
		}

		user.password = password;

		return await user.save();
	},

	getByEmail: async (email: string): Promise<any> => {
		const user = await UserModel.findOne({ email });

		return user;
	},

	getByPhone: async (phone: number): Promise<any> => {
		const user = await UserModel.findOne({ phone });
		return user;
	},

	// "setOtp" using only in forgot password email otp
	setOtp: async (email: string, otp: any): Promise<any> => {
		const result = await UserModel.findOneAndUpdate(
			{ email },
			{ $set: { otp: otp } },
			{ new: true }
		);

		return result;
	},

	deleteOtp: async (email: string): Promise<any> => {
		
		const result = await UserModel.findOneAndUpdate(
			{ email },
			{ $unset: { otp: "" } },
			{ new: true }
		);
		
		if (!result) throw new Error("User not found");
			
		return result;
	},

	// user status is updated only by 'admin'
	updateUser: async (userId: string, data: any): Promise<any> => {
		const user = await UserModel.findOneAndUpdate(
			{ _id: userId },
			{ $set: data },
			{ new: true }
		);
		return user;
	},

	updateVerification: async (email: string): Promise<any> => {
		const user = await UserModel.findOne({ email });
		if (!user) throw new Error("User not found"); 

		user.isVarified = !user.isVarified;

		return await user.save();
	},
};
// };

// export default repository();
