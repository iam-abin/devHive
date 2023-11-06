import schemas from "../../database/mongo/models";
import { UpdatePasswordInput } from "../../types/userInterface";

const { UserModel } = schemas;

// we want to export some closure
const repository = () => {
	return {

		 // these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

		register: async (userData: any) => {

			const userObject = new UserModel(userData);
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

		updateStatus: async ({ email, isActive }: any) => {

			console.log("in pudate status",);

			const user = await UserModel.findOne({email});
			if (!user) {
				throw new Error("User not found");
			}

			user.isActive = isActive;

			return await user.save();

		},
	};
};

export default repository();
