import { NotFoundError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';
import { MemberShipPlanUpdatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/membership-plan-updated-publisher ';
import { kafkaClient } from '../../config/kafka.connection';

export = (dependencies: IDependency) => {
    const {
        repositories: { membershipRepository },
    } = dependencies;

    if (!membershipRepository) {
        throw new Error('membershipRepository should exist in dependencies');
    }

    const execute = async (membershipId: string) => {
        const memberShipPlan = await membershipRepository.getById(membershipId);
        if (!memberShipPlan) throw new NotFoundError('Menbership plan not found');
        const updatedMemberShipPlan = await membershipRepository.blockUnblock(membershipId);

        //  // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed
        // await produceMessage(updatedMemberShipPlan, 'MEMBERSHIP_PLAN_UPDATED_TOPIC')
        const memberShipPlanUpdatedEvent = new MemberShipPlanUpdatedEventPublisher(kafkaClient);
        await memberShipPlanUpdatedEvent.publish({
            membershipPlanId: updatedMemberShipPlan.id,
            name: updatedMemberShipPlan?.name,
            features: updatedMemberShipPlan?.features,
            description: updatedMemberShipPlan?.description,
            price: updatedMemberShipPlan?.price,
            isActive: updatedMemberShipPlan?.isActive,
        });

        return updatedMemberShipPlan;
    };

    return { execute };
};
