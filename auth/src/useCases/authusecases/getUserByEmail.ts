// import usersRepository from "../../frameworks/repositories/mongo/usersRepository";

import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: { usersRepository },
	} = dependencies;


	if (!usersRepository) throw new Error("usersRepository should exist in dependencies");

	const execute = async (email: string) => {
		return await usersRepository.getByEmail(email);
	};

	return { execute };
};
