import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const { repositories: { jobRepository } } = dependencies;

	if (!jobRepository) throw new Error("jobRepository should exist in dependencies");
		
	const execute = (jobFilterData: string) => {
		
		const filterCriteria: any = {};

		Object.entries(jobFilterData).forEach(([key, value]) => {
			if (value !== "") {
				filterCriteria[key] = value;
			}
		});
		
		return jobRepository.filterJob(filterCriteria);
	};

	return { execute };
};
