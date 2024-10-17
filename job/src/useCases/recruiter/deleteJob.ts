import { ForbiddenError, NotFoundError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { JobDeletedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/job-deleted-publisher";
import { kafkaClient } from "../../config/kafka.connection";

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository },
    } = dependencies;

    if (!jobRepository) {
        throw new Error("jobRepository should exist in dependencies");
    }

    const execute = async (jobId: string, recruiterId: string) => {
        const job = await jobRepository.getAJob(jobId);
        if (!job) throw new NotFoundError();
        console.log(job);
        console.log(recruiterId);
        
        if (recruiterId !== job.recruiterId._id.toString()) {
            throw new ForbiddenError("You cannot modify others job");
        }
        const deletedJob = await jobRepository.deleteJob(jobId);
        if (deletedJob) {
            // to produce a message to kafka topic
            // isBlocked contains user data with 'isActive' value changed
            // await produceMessage(deletedJob, 'JOB_DELETED_TOPIC')
            const jobDeletedEvent = new JobDeletedEventPublisher(kafkaClient);
            await jobDeletedEvent.publish({ jobId });
        }
        return deletedJob;
    };

    return { execute };
};
