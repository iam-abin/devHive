export = (dependencies: any) => {
	const { repositories:{usersRepository} } = dependencies;

	if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}

	const execute = async (phone: number) => {
		return await usersRepository.getByPhone(phone);
	};

	return { execute };
};
