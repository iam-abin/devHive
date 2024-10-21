import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const { repositories:{membershipRepository} } = dependencies;

	if (!membershipRepository) {
		throw new Error("membershipRepository should exist in dependencies");
	}

	const execute = async(jobId: string) => {
		return await membershipRepository.getById(jobId);
	};

	return { execute };
};
