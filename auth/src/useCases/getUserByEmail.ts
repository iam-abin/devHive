export = (dependencies: any) => {
	const { repositories:{usersRepository} } = dependencies;

	if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}


	const execute = (email: string) => {
		console.log("get user by email usecase");
		
		return usersRepository.getByEmail(email);
	};

	return { execute };
};
