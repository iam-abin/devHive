import { NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependency";
import { JobUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-updated-publisher";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository },
    } = dependencies;

    if (!jobRepository) {
        throw new Error("jobRepository should exist in dependencies");
    }

    const execute = async (jobId: string) => {
        const job = await jobRepository.getById(jobId);
        if (!job) throw new NotFoundError("Job not found");
        const isBlocked = await jobRepository.blockUnblock(jobId);

        // to produce a message to kafka topic
        // isBlocked contains user data with 'isActive' value changed
        const jobUpdatedEvent = new JobUpdatedEventPublisher(kafkaClient);
        await jobUpdatedEvent.publish({
            jobId: isBlocked.jobId,
            isActive: isBlocked.isActive
        });

        return isBlocked;
    };

    return { execute };
};
