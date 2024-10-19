import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const { repositories:{recruiterRepository} } = dependencies;

	if (!recruiterRepository) {
		throw new Error("recruiterRepository should exist in dependencies");
	}

	const execute = async() => {
		return await recruiterRepository.getAllRecruiters();
	};

	return { execute };
};
