import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export  = (dependencies: IDependenciesData) => {
	const { repositories:{candidateProfileRepository} } = dependencies;

	if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

	const execute = async(id: string, skills: any) => {

        return await candidateProfileRepository.updateSkills(id,skills);
	};

    return { execute }
};
