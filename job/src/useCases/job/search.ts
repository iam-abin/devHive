import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        repositories: { jobRepository },
    } = dependencies;

    if (!jobRepository) {
        throw new Error('jobRepository should exist in dependencies');
    }

    const execute = async (searchText: string, page: number, limit: number) => {
       // pagination
       const skip = (page - 1) * limit;
        const searchResult = await jobRepository.getSearchResults(searchText.trim(), skip, limit);

        // It is used to get the total number of pages
        const searchResultCount = await jobRepository.getCountOfSearchResults(searchText);
        const numberOfPages = Math.ceil(searchResultCount / limit);
        return { jobs: searchResult, numberOfPages };
    };

    return { execute };
};
