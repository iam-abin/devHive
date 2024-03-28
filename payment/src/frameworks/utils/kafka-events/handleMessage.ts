
import premiumRepository  from "../../repositories/mongo/membership-plan.repository";

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		
		case "MEMBERSHIP-PLAN-CREATED-TOPIC":
			premiumRepository.createMembershipPlan(data);
			break;

		case "MEMBERSHIP-PLAN-UPDATED-TOPIC":
			premiumRepository.updateMembershipPlan(data.userId, data);
			break;

		default:
			break;
	}
};
