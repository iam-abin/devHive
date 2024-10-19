import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const {
		repositories: { recruiterProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) throw new Error( "recruiterProfileRepository should exist in dependencies" );
	
	const execute = async (existingData: any, updatedData: any) => {
		
		return await recruiterProfileRepository.updateRecruiterProfile(existingData._id,updatedData);
	};

	return { execute };
};
