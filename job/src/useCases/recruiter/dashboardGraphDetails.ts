import { IDependency } from '../../frameworks/types/dependency';
import { APPLICATION_STATUS } from '../../frameworks/utils/constants';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository, jobApplicationRepository },
    } = dependencies;

    if (!jobRepository) throw new Error('jobRepository should exist in dependencies');

    if (!jobApplicationRepository) throw new Error('jobApplicationRepository should exist in dependencies');

    const execute = async (recruiterId: string) => {
        const [applied, shortlisted, rejected]: [number, number, number] = await Promise.all([
            jobApplicationRepository.getCountOfApplicationsStatus(recruiterId, APPLICATION_STATUS.APPLIED),
            jobApplicationRepository.getCountOfApplicationsStatus(
                recruiterId,
                APPLICATION_STATUS.SHORTLISTED,
            ),
            jobApplicationRepository.getCountOfApplicationsStatus(recruiterId, APPLICATION_STATUS.REJECTED),
        ]);

        return { applied, shortlisted, rejected };
    };

    return { execute };
};
