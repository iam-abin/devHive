import { CandidateDataProfile } from "../../frameworks/types/candidate-profile-interface";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: { recruiterProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) throw new Error( "recruiterProfileRepository should exist in dependencies" );
	
	const execute = async (existingData: any, updatedData: any) => {
		
		return await recruiterProfileRepository.updateRecruiterProfile(existingData._id,updatedData);
	};

	return { execute };
};
