export = (dependencies: any) => {
	const {
		repositories: { membershipRepository },
	} = dependencies;

	if (!membershipRepository) {
		throw new Error(
			"membershipRepository should exist in dependencies"
		);
	}

	const execute = async () => {
		
		const membershipPlans = await membershipRepository.getAllMembershipPlans();
		
		return membershipPlans;
	};

	return { execute };
};
