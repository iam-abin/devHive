import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobApplicationRepository },
    } = dependencies;

    if (!jobApplicationRepository) {
        throw new Error('jobApplicationRepository should exist in dependencies');
    }

    const execute = async (candidateId: string, page: number, limit: number) => {
        // pagination
        const skip = (page - 1) * limit;
        const appliedJobs = await jobApplicationRepository.getAllAppliedJobsByCandidateId(
            candidateId,
            skip,
            limit,
        );

        const appliedJobsCount = await jobApplicationRepository.getCountOfAppliedJobs(candidateId);

        const numberOfPages = Math.ceil(appliedJobsCount / limit);
        return { appliedJobs, numberOfPages };
    };

    return { execute };
};
