import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
	const {
		repositories: { jobRepository },
	} = dependencies;

	if (!jobRepository)
		throw new Error("jobRepository should exist in dependencies");

	const execute = async(
		skip: number,
		limit: number
	) => {
		const jobs = await jobRepository.getAllJobs(skip, limit);
		const jobCount = await jobRepository.getCountOfJobs()
		return { jobs ,jobCount }
	};

	return { execute };
};
