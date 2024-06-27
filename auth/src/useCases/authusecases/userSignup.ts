import { User } from "../../entities";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { IUserDataSignup } from "../../frameworks/types/userInterface";

export  = (dependencies: IDependenciesData) => {
	const { repositories:{usersRepository} } = dependencies;

	if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}

	const execute = async ({ name, email, phone, password, userType, otp }: IUserDataSignup) => {
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
