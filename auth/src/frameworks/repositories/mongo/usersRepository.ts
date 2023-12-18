import schemas from "../../database/mongo/models";
import { UpdatePasswordInput, UserDataSignup } from "../../types/userInterface";

const { UserModel } = schemas;

// we want to export some closure
const repository = () => {
	return {

		 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

		register: async (userData: UserDataSignup) => {
			const userObject = UserModel.buildUser(userData);
			return await userObject.save();
		},

		updatePassword: async ({ id, password }: UpdatePasswordInput) => {

			const user = await UserModel.findById(id);
			if (!user) {
				throw new Error("User not found");
			}

			user.password = password;

			return await user.save();
			
		},
		
		getByEmail: async (email: string) => {

			const user = await UserModel.findOne({ email: email });
			return user;
			
		},

		getByPhone: async (phone: number) => {

			const user = await UserModel.findOne({ phone: phone });
			return user;
			
		},

		// "setOtp" using only in forgot password email otp 
		setOtp: async (email: string, otp: any) => {

			console.log("in set otp",);

			const result = await UserModel.findOneAndUpdate(
				{ email },
				{ $set: { otp: otp } },
				{ new: true }
			);
			console.log("set result: ", result);
			return result

		},


		deleteOtp: async (email: string) => {

			console.log("in delete otp",);

			const result = await UserModel.findOneAndUpdate(
				{ email },
				{ $unset: { otp: "" } },
				{ new: true }
			);
			console.log("delete result: ", result);
			
			if (!result) {
				throw new Error("User not found");
			}

			return result

		},

		// user status is updated only by 'admin'
		updateUser: async (userId: string, data: any): Promise<any> => {
			const user = await UserModel.findOneAndUpdate({ "_id": userId }, { $set: data }, {new: true});
			return user;
		},
		

		// updateStatus: async ({ email, isActive }: any) => {

		// 	console.log("in update status",);

		// 	const user = await UserModel.findOne({email});
		// 	if (!user) {
		// 		throw new Error("User not found");
		// 	}

		// 	user.isActive = isActive;

		// 	return await user.save();

		// },

		updateVerification: async (email: string) => {

			console.log("in update status",email);

			const user = await UserModel.findOne({email});
			if (!user) {
				throw new Error("User not found");
			}

			user.isVarified = !user.isVarified;

			return await user.save();

		},
	};
};

export default repository();
