// import { CandidateProfile } from "../../entities";
import { CandidateDataProfile } from "../../frameworks/types/candidate-profile-interface";

export  = (dependencies: any) => {
	const { repositories:{candidateRepository} } = dependencies;

	if (!candidateRepository) {
		throw new Error("candidateRepository should exist in dependencies");
	}

	const execute = (profileData: CandidateDataProfile) => {
		const profile = new CandidateProfile(profileData);
        return candidateRepository.createCandidateProfile(profile);
	};

    return { execute }
};
