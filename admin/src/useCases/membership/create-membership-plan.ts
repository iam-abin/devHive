import { MembershipPlan } from "../../entities/membership-plan";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { MembershipPlanData } from "../../frameworks/types/membership-plan-interface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { membershipRepository },
	} = dependencies;

	if (!membershipRepository) {
		throw new Error("membershipRepository should exist in dependencies");
	}

	const execute = async (premiumPlanData: MembershipPlanData) => {
		
		const membershipPlan = new MembershipPlan(premiumPlanData);

		return await membershipRepository.createMembershipPlan(membershipPlan);
	  };

	return { execute };
};
