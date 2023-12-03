export = (dependencies: any) => {
	const {
		repositories: { recruiterProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error(
			"recruiterProfileRepository should exist in dependencies"
		);
	}

	const execute = async (id: string) => {
		console.log(id);
		console.log("llll");
		
		const profile = await recruiterProfileRepository.getProfileById(id);
		console.log("llllllllllllllllll");
		
		console.log(profile);
		console.log("llllllllllllllllll");

		
		console.log("llll");
		
		
		return profile;
	};

	return { execute };
};
