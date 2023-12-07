export = (dependencies: any) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) {
		throw new Error(
			"candidateProfileRepository should exist in dependencies"
		);
	}

	const execute = async (candidateId: string) => {
		console.log("in candidate profile execute ", candidateId);
		
		const profile = await candidateProfileRepository.getProfileByCandidateId(candidateId);
		console.log("profile ", profile);
		
		return profile;
	};

	return { execute };
};
