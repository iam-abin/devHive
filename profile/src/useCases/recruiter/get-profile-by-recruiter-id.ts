export = (dependencies: any) => {
	const {
		repositories: { recruiterProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) throw new Error("recruiterProfileRepository should exist in dependencies");

	const execute = async (userId: string) => {
		
		const profile = await recruiterProfileRepository.getProfileByUserId(userId);
		
		return profile;
	};

	return { execute };
};
