import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
    const {
        repositories: { jobApplicationRepository },
    } = dependencies;

    if (!jobApplicationRepository) {
        throw new Error(
            "jobApplicationRepository should exist in dependencies"
        );
    }

    const execute = async (
        candidateId: string,
        page: number,
        limit: number
    ) => {
        // pagination
        const skip = (page - 1) * limit;
        const appliedJobsCount =
            await jobApplicationRepository.getCountOfCandidateAppliedJobs(
                candidateId
            );
        const appliedJobs =
            await jobApplicationRepository.getAllAppliedJobsByCandidateId(
                candidateId,
                skip,
                limit
            );

        const numberOfPages = Math.ceil(appliedJobsCount / limit);
        return { appliedJobs, numberOfPages };
    };

    return { execute };
};
