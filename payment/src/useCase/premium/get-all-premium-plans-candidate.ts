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
		console.log("in candidate membershipPlans execute ");
		
		const membershipPlans = await membershipRepository.getAllMembershipPlans();
		console.log("membershipPlans ", membershipPlans);
		
		return membershipPlans;
	};

	return { execute };
};
