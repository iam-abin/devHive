import { CandidateProfile } from "../../entities";
import { CandidateDataProfile } from "../../frameworks/types/candidate-profile-interface";

export  = (dependencies: any) => {
	const { repositories:{candidateProfileRepository} } = dependencies;

	if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

	const execute = (profileData: CandidateDataProfile) => {
		const profile = new CandidateProfile(profileData);
        return candidateProfileRepository.createCandidateProfile(profile);
	};

    return { execute }
};
