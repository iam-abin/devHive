import { IDependency } from "../../frameworks/types/dependency";

export  = (dependencies: IDependency) => {
	const { repositories:{candidateProfileRepository} } = dependencies;

	if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

	const execute = async(id: string, jobs: any) => {

        return await candidateProfileRepository.updatePreferredJobs(id,jobs);
	};

    return { execute }
};
