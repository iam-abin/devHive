import { NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
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
		if(!profile) throw new NotFoundError("Profile not found")
		return profile;
	};

	return { execute };
};
