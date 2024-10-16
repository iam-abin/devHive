import { kafkaClient } from "../../config/kafka.connection";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { CandidateProfileUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/candidate-profile-updated-publisher ";

export  = (dependencies: IDependency) => {
	const { repositories:{candidateProfileRepository} } = dependencies;

	if (!candidateProfileRepository) {
		throw new Error("candidateProfileRepository should exist in dependencies");
	}

	const execute = async(profileId: string, skills: string[]) => {
		const candidate = await candidateProfileRepository.updateSkills(profileId, skills);
		const candidateProfileUpdatedEvent = new CandidateProfileUpdatedEventPublisher(kafkaClient);
        await candidateProfileUpdatedEvent.publish({
            skills: candidate?.skills,
            userId: profileId,
        })
        return 
	};

    return { execute }
};
