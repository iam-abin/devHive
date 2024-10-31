import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { recruiterRepository },
    } = dependencies;

    if (!recruiterRepository) {
        throw new Error('recruiterRepository should exist in dependencies');
    }

    const execute = async (searchKey: string, page: number, limit: number) => {
        // pagination
        const skip = (page - 1) * limit;

        const recruiters = await recruiterRepository.searchRecruiters(searchKey, skip, limit);
        const recruitersCount = await recruiterRepository.getCountOfSearchedRecruiters(searchKey);
        const numberOfPages = Math.ceil(recruitersCount / limit);
        return { recruiters, numberOfPages };
    };

    return { execute };
};
