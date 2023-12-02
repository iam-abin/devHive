import { RecruiterProfile } from "../../entities";
import { RecruiterDataProfile } from "../../frameworks/types/recruiter-profile-interface";

export  = (dependencies: any) => {
	const { repositories:{ recruiterProfileRepository} } = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error("recruiterProfileRepository should exist in dependencies");
	}

	const execute = (profileData: RecruiterDataProfile) => {
		const profile = new RecruiterProfile(profileData);
        return recruiterProfileRepository.createRecruiterProfile(profile);
	};

    return { execute }
};
