import { CandidateDataProfile } from "../../frameworks/types/candidate-profile-interface";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export  = (dependencies: IDependenciesData) => {
	const { repositories:{candidateProfileRepository} } = dependencies;

	if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

	const execute = async(id: string, jobs: any) => {

        return await candidateProfileRepository.updatePreferredJobs(id,jobs);
	};

    return { execute }
};
