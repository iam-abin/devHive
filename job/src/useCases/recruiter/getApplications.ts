import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobApplicationRepository },
    } = dependencies;

    if (!jobApplicationRepository) {
        throw new Error('jobApplicationRepository should exist in dependencies');
    }

    // either recruiterId or candidateId can be null based on the request sender
    const execute = async (recruiterId: string, candidateId: string, page: number, limit: number) => {
        // pagination
        const skip = (page - 1) * limit;

        const applications = await jobApplicationRepository.getAllJobApplicationsByUserId(
            recruiterId,
            candidateId,
            skip,
            limit,
        );
        const jobApplicationsCount = await jobApplicationRepository.getCountOfApplications(recruiterId);
        const numberOfPages = Math.ceil(jobApplicationsCount / limit);

        return { applications, numberOfPages };
    };

    return { execute };
};
