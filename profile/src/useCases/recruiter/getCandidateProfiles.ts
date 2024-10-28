import { NotFoundError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { recruiterProfileRepository, candidateProfileRepository },
    } = dependencies;

    if (!recruiterProfileRepository) {
        throw new Error('recruiterProfileRepository should exist in dependencies');
    }

    const execute = async (page: number, limit: number, recruiterId: string) => {
        const skip = (page - 1) * limit;
        const profile = await recruiterProfileRepository.getProfileByUserId(recruiterId);
        if (!profile) throw new NotFoundError('profile not found');

        const profiles = await candidateProfileRepository.getAllCandidates(skip, limit);
        const totalJobs = await candidateProfileRepository.getCountOfCandidatesProfiles();
        const totalNumberOfPages = Math.ceil(totalJobs / limit);
        return { candidates: profiles, totalNumberOfPages };
    };

    return { execute };
};
