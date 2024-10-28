import premiumRepository from '../../repositories/mongo/membershipPlan.repository';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMessage = (data: any, topic: string) => {
    switch (topic) {
        case 'MEMBERSHIP-PLAN-CREATED-TOPIC':
            premiumRepository.createMembershipPlan(data);
            break;

        case 'MEMBERSHIP-PLAN-UPDATED-TOPIC': {
            const { membershipPlanId, ...rest } = data;
            premiumRepository.updateMembershipPlan(membershipPlanId, rest);
            break;
        }
        default:
            break;
    }
};
