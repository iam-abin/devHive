import { NotFoundError } from "@abijobportal/common";
import { kafkaClient } from "../../config/kafka.connection";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";

export = (dependencies: IDependency) => {
	const { repositories:{candidateRepository} } = dependencies;

	if (!candidateRepository) {
		throw new Error("candidateRepository should exist in dependencies");
	}

	const execute = async(userId: string) => {

		const user = await candidateRepository.getById(userId)
		if(!user) throw new NotFoundError("User not found")
        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const userUpdatedEvent = new UserUpdatedEventPublisher(kafkaClient)
        
		const isBlocked = await candidateRepository.blockUnblock(userId);
		await userUpdatedEvent.publish(isBlocked)

		return isBlocked
	};

	return { execute };
};
