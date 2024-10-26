import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
	const { repositories:{membershipRepository} } = dependencies;

	if (!membershipRepository) {
		throw new Error("membershipRepository should exist in dependencies");
	}

	const execute = async(page: number, limit: number) => {

		// pagination
        const skip = (page - 1) * limit;
		
		const membershipPlans = await membershipRepository.getAllMembershipPlans(skip, limit);; 
		const paymentsCount = await membershipRepository.getCountOfMembershipPlans();
		
        const numberOfPages = Math.ceil(paymentsCount / limit);
		
		return  { membershipPlans, numberOfPages }
	};

	return { execute };
};
