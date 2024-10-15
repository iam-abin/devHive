import Models from "../../database/mongo/models";
import { IUserAttributes } from "../../database/mongo/models/users";
import { IUpdatePassword } from "../../types/userInterface";

const { UserModel } = Models;

// we want to export some closure
// const repository = () => {
// 	return {
export = {
	// these fn's are returning a promise as async so we can define return type as Promise<CandidateDataInterface>

	register: async (userData: IUserAttributes): Promise<any> => {
		const userObject = UserModel.buildUser(userData);
		return await userObject.save();
	},

	updatePassword: async ({
		userId,
		password,
	}: IUpdatePassword): Promise<any> => {
		const user = await UserModel.findByIdAndUpdate(userId, {password}, {new: true});
		return user
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
	updateUser: async (id: string, data: any): Promise<any> => {
		const user = await UserModel.findOneAndUpdate(
			{ _id: id },
			{ $set: data },
			{ new: true }
		);
		return user;
	},

	updateVerification: async (email: string): Promise<any> => {
		const user = await UserModel.findOneAndUpdate({ email }, {isVerified: true}, {new: true});
		
		return user
	},
};
// };

// export default repository();
