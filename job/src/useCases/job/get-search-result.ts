import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = async (searchText: string, skip: number, limit: number) => {

		 // Fetch the list of jobIds that the current user has already applied to

		const searchResult = await jobRepository.getSearchResults(searchText, skip, limit);

		// It is used to get the total number of pages
		const searchResultCount = await jobRepository.getCountOfSearchResults(searchText);
		return {searchResult, searchResultCount};

	};

	return { execute };
};
