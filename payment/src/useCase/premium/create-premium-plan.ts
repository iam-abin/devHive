export = (dependencies: any) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) {
		throw new Error(
			"candidateProfileRepository should exist in dependencies"
		);
	}

	const execute = async (userId: string) => {
		console.log("in candidate profile execute ", userId);
		
		const profile = await candidateProfileRepository.deleteResumeByCandidateId(userId);
		console.log("profile ", profile);
		
		return profile;
	};

	return { execute };
};
