export = (dependencies: any) => {
	const {
		repositories: { usersRepository },
	} = dependencies;


	if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}


	const execute = (email: string) => {
		console.log("in usersRepository usersRepository ",usersRepository);
		
		console.log("get user by email usecase", email);

		// 
		
		return usersRepository.getByEmail(email);
	};

	return { execute };
};
