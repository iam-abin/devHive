import { CandidateProfile } from "../../entities";
import { CandidateDataProfile } from "../../frameworks/types/candidate-profile-interface";

export  = (dependencies: any) => {
	const { repositories:{candidateProfileRepository} } = dependencies;

	if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

	const execute = async (profileData: CandidateDataProfile) => {

		const profile = new CandidateProfile(profileData);
		console.log("in candidate create profile usecase execute: ", profile);

		return await candidateProfileRepository.createCandidateProfile(profile);
	};

    return { execute }
};
