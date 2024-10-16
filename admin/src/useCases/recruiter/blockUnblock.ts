import { NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { UserUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-updated-publisher";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency) => {
    const {
        repositories: { recruiterRepository },
    } = dependencies;

    if (!recruiterRepository) {
        throw new Error("recruiterRepository should exist in dependencies");
    }

    const execute = async (userId: string) => {
        const recruiter = await recruiterRepository.getById(userId);
        if (!recruiter) throw new NotFoundError("recruiter not found");
        const isBlocked = await recruiterRepository.blockUnblock(userId);
        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const userUpdatedEvent = new UserUpdatedEventPublisher(kafkaClient);
        await userUpdatedEvent.publish(isBlocked);
        return isBlocked;
    };

    return { execute };
};
