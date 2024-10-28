import { MembershipPlan } from '../../entities/membership-plan';
import { IDependency } from '../../frameworks/types/dependency';
import { IMembershipPlanData } from '../../entities/membership-plan';
import { MemberShipPlanCreatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/membership-plan-created-publisher';
import { kafkaClient } from '../../config/kafka.connection';
import { BadRequestError } from '@abijobportal/common';

export = (dependencies: IDependency) => {
    const {
        repositories: { membershipRepository },
    } = dependencies;

    if (!membershipRepository) {
        throw new Error('membershipRepository should exist in dependencies');
    }

    const execute = async (premiumPlanData: IMembershipPlanData) => {
        const isPlanExist = await membershipRepository.getByName(premiumPlanData.name);
        if (isPlanExist) throw new BadRequestError('This plan already exist');
        const plan = new MembershipPlan(premiumPlanData);
        const membershipPlan = await membershipRepository.createMembershipPlan(plan);

        // // to produce a message to kafka topic
        // // isBlocked contains user data with 'isActive' value changed

        const memberShipPlanCreatedEvent = new MemberShipPlanCreatedEventPublisher(kafkaClient);
        await memberShipPlanCreatedEvent.publish({
            membershipPlanId: membershipPlan.id,
            name: membershipPlan?.name,
            features: membershipPlan?.features,
            description: membershipPlan?.description,
            price: membershipPlan?.price,
            isActive: membershipPlan?.isActive,
        });

        return membershipPlan;
    };

    return { execute };
};
