import { User } from "../entities";
import { UserDataSignup } from "../frameworks/types/userInterface";

export  = (dependencies: any) => {
	const { repositories:{usersRepository} } = dependencies;

	if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}

	const execute = async ({ name, email, phone, password, userType, otp }: UserDataSignup) => {
		const user = new User({
			name,
			email,
			phone,
			password,
			userType,
			otp
		});

        return await usersRepository.register(user);
	};

    return { execute }
};
