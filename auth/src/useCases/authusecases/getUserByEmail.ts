// import usersRepository from "../../frameworks/repositories/mongo/usersRepository";

export = (dependencies: any) => {
	const {
		repositories: { usersRepository },
	} = dependencies;


	if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}

	const execute = async (email: string) => {
		
		console.log("inside --->> getUser by email usecase", email);
		return await usersRepository.getByEmail(email);
	};

	return { execute };
};
