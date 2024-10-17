
import premiumRepository  from "../../repositories/mongo/membershipPlan.repository";

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		
		case "MEMBERSHIP-PLAN-CREATED-TOPIC":
			premiumRepository.createMembershipPlan(data);
			break;

		case "MEMBERSHIP-PLAN-UPDATED-TOPIC":
			const {membershipPlanId, ...rest} = data
			premiumRepository.updateMembershipPlan(membershipPlanId, rest);
			break;

		default:
			break;
	}
};
