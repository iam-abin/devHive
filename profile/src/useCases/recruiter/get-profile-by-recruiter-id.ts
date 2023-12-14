export = (dependencies: any) => {
	const {
		repositories: { recruiterProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error(
			"recruiterProfileRepository should exist in dependencies"
		);
	}

	const execute = async (userId: string) => {
		console.log("in recruiter profile execute ", userId);

		
		const profile = await recruiterProfileRepository.getProfileByUserId(userId);
		console.log("profile ", profile);
		
		
		return profile;
	};

	return { execute };
};
