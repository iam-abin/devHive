import { MembershipPlan } from "../../entities/membership-plan";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";
import { IMembershipPlanData } from "../../entities/membership-plan";

export = (dependencies: IDependenciesData) => {
	const {
		repositories: { membershipRepository },
	} = dependencies;

	if (!membershipRepository) {
		throw new Error("membershipRepository should exist in dependencies");
	}

	const execute = async (premiumPlanData: IMembershipPlanData) => {
		
		const membershipPlan = new MembershipPlan(premiumPlanData);

		return await membershipRepository.createMembershipPlan(membershipPlan);
	  };

	return { execute };
};
