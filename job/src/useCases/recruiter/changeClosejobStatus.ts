import { ForbiddenError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository },
    } = dependencies;

    if (!jobRepository) {
        throw new Error('jobRepository should exist in dependencies');
    }

    const execute = async (jobId: string, recruiterId: string) => {
        const job = await jobRepository.getAJob(jobId);

        if (recruiterId !== job.recruiterId.id.toString()) {
            throw new ForbiddenError('You cannot modify others job');
        }

        return await jobRepository.changeClosejobStatus(jobId);
    };

    return { execute };
};
