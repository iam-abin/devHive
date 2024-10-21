import { NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependency";
import { IRecruiterProfile } from "../../frameworks/types/recruiter";

export = (dependencies: IDependency) => {
	const {
		repositories: { recruiterProfileRepository },
	} = dependencies;

	if (!recruiterProfileRepository) throw new Error( "recruiterProfileRepository should exist in dependencies" );
	
	const execute = async (recruiterId: string, updatedData: Partial<IRecruiterProfile>) => {
		const profile = await recruiterProfileRepository.getProfileByUserId(recruiterId);
		if(!profile) throw new NotFoundError("profile not found")
		return await recruiterProfileRepository.updateRecruiterProfile(recruiterId,updatedData);
	};

	return { execute };
};
