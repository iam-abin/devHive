import { CandidateDataProfile } from "../../frameworks/types/candidate-profile-interface";

export  = (dependencies: any) => {
	const { repositories:{recruiterProfileRepository} } = dependencies;

	if (!recruiterProfileRepository) {
		throw new Error("recruiterProfileRepository should exist in dependencies");
	}

	const execute = (profileData: CandidateDataProfile) => {
        return recruiterProfileRepository.updateRecruiterProfile(profileData);
	};

    return { execute }
};
