import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { jobRepository },
	} = dependencies;

	if (!jobRepository) {
		throw new Error("jobRepository should exist in dependencies");
	}

	const execute = (jobFilterData: string) => {
		console.log("in filter jobs usecase 1 ", jobFilterData);

		const filterCriteria: any = {};

		Object.entries(jobFilterData).forEach(([key, value]) => {
			if (value !== "") {
				filterCriteria[key] = value;
			}
		});

		console.log("in filter jobs usecase 2 ", filterCriteria);
		

		return jobRepository.filterJob(filterCriteria);
	};

	return { execute };
};
