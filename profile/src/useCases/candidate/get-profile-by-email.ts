import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) {
		throw new Error(
			"candidateProfileRepository should exist in dependencies"
		);
	}

	const execute = async (email: string) => {
		const profile = await candidateProfileRepository.getProfileByEmail(email);
		
		return profile;
	};

	return { execute };
};
