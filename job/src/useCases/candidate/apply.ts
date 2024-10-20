import { BadRequestError, NotFoundError } from "@abijobportal/common";
import { JobApplication } from "../../entities/jobApplications";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository, jobApplicationRepository },
    } = dependencies;

    if (!jobApplicationRepository)
        throw new Error(
            "jobApplicationRepository should exist in dependencies"
        );

    const execute = async (candidateId: string, jobId: string) => {
        const isApplicationExist =
            await jobApplicationRepository.getAnAppliedJobByCandidate(
                candidateId,
                jobId
            );
        if (isApplicationExist)
            throw new BadRequestError("you have already applied for this job");

        const job = await jobRepository.getAJob(jobId);
        if (!job) throw new NotFoundError("job not found");
        const application = {
            jobId,
            candidateId,
            recruiterId: job.recruiterId,
            applicationStatus: "Applied",
        };

        const applicationData = new JobApplication(application);
        return await jobApplicationRepository.applyJob(applicationData);
    };

    return { execute };
};
