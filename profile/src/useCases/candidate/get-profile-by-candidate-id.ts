import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const {
		repositories: { candidateProfileRepository }
	} = dependencies;

	if (!candidateProfileRepository) throw new Error("candidateProfileRepository should exist in dependencies");

	const execute = async (candidateId: string) => {
		const profile = await candidateProfileRepository.getProfileByUserId(candidateId);
		return profile;
	};

	return { execute };
};
