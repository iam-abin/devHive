
import premiumRepository  from "../../repositories/mongo/premium.repository";

export const handleMessage = (data: any, topic: string, message: any) => {
	switch (topic) {
		case "MEMBERSHIP_PLAN_CREATED_TOPIC":
			console.log(
				"admin handleMessage MEMBERSHIP_PLAN_CREATED_TOPIC",
				data
			);

			premiumRepository.createMembershipPlan(data);

			break;

		case "MEMBERSHIP_PLAN_UPDATED_TOPIC":
			console.log("admin handleMessage createUserTopic", data);

			premiumRepository.updateMembershipPlan(data.userId, data);
			break;

		default:
			break;
	}
};
