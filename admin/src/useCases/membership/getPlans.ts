import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const { repositories:{membershipRepository} } = dependencies;

	if (!membershipRepository) {
		throw new Error("membershipRepository should exist in dependencies");
	}

	const execute = async() => {
		return await membershipRepository.getAllMembershipPlans();
	};

	return { execute };
};
