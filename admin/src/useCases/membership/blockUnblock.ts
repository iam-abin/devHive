import { kafkaClient } from "../../config/kafka.connection";
import { IDependency } from "../../frameworks/types/dependency";
import { MemberShipPlanUpdatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/membership-plan-updated-publisher ";

export = (dependencies: IDependency) => {
	const { repositories:{membershipRepository} } = dependencies;

	if (!membershipRepository) {
		throw new Error("membershipRepository should exist in dependencies");
	}

	const execute = async(membershipId: string) => {
		const updatedMemberShipPlan = await membershipRepository.blockUnblock(membershipId);
		const memberShipPlanUpdatedEvent = new MemberShipPlanUpdatedEventPublisher(kafkaClient);
        await memberShipPlanUpdatedEvent.publish({
            membershipPlanId: updatedMemberShipPlan.id,
            isActive : updatedMemberShipPlan.isActive,
        });
		return updatedMemberShipPlan
	};

	return { execute };
};
