import { User } from "../../entities";
import { UserDataSignup } from "../../frameworks/types/userInterface";

export const signin = (dependencies: any) => {
	const { usersRepository } = dependencies;

	if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}

	const execute = ({ name, email, phone, password, userType }: UserDataSignup) => {
		const user = new User({
			name,
			email,
			phone,
			password,
			userType,
		});
        return usersRepository.register(user);
	};

    return { execute }
};
