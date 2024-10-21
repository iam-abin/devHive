import { IDependency } from "../../frameworks/types/dependencyInterface";
import { APPLICATION_STATUS } from "../../frameworks/utils/constants";

export = (dependencies: IDependency) => {
	const {
		repositories: {
			jobRepository,
			jobApplicationRepository,
		},
	} = dependencies;

	if (!jobRepository) throw new Error("jobRepository should exist in dependencies");

	if (!jobApplicationRepository) throw new Error("jobApplicationRepository should exist in dependencies"); 

	const execute = async (recruiterId: string) => {
		const [applied, shortlisted, rejected]: any =
			await Promise.all([
				jobApplicationRepository.getCountOfApplicationStatus(recruiterId, APPLICATION_STATUS.APPLIED),
				jobApplicationRepository.getCountOfApplicationStatus(recruiterId, APPLICATION_STATUS.SHORTLISTED),
				jobApplicationRepository.getCountOfApplicationStatus(recruiterId, APPLICATION_STATUS.REJECTED),
			]);
			
		return { applied, shortlisted, rejected };
	};

	return { execute };
};
