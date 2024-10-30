import { NotFoundError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { candidateProfileRepository },
    } = dependencies;

    if (!candidateProfileRepository)
        throw new Error('candidateProfileRepository should exist in dependencies');

    const execute = async (candidateId: string) => {
        
        const profile = await candidateProfileRepository.getProfileByUserId(candidateId);
        if (!profile) throw new NotFoundError('Profile not found');
        return profile;
    };

    return { execute };
};
