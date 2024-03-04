
import premiumRepository  from "../../repositories/mongo/membership-plan.repository";

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		case "MEMBERSHIP-PLAN-CREATED-TOPIC":
			console.log(
				"admin handleMessage MEMBERSHIP_PLAN_CREATED_TOPIC",
				data
			);

			premiumRepository.createMembershipPlan(data);

			break;

		case "MEMBERSHIP-PLAN-UPDATED-TOPIC":
			console.log("admin handleMessage createUserTopic", data);

			premiumRepository.updateMembershipPlan(data.userId, data);
			break;

		default:
			break;
	}
};
