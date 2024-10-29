import { MembershipPlan } from '../../../entities/membershipPlan';
import premiumRepository from '../../repositories/mongo/membershipPlan.repository';
import { IMembershipPlan } from '../../types/membershipPlan';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMessage = (data: any, topic: string) => {
    switch (topic) {
        case 'MEMBERSHIP-PLAN-CREATED-TOPIC': {
            const plan = new MembershipPlan(data);
            premiumRepository.createMembershipPlan(plan as IMembershipPlan);
            break;
        }

        case 'MEMBERSHIP-PLAN-UPDATED-TOPIC': {
            const { membershipPlanId, ...rest } = data;
            premiumRepository.updateMembershipPlan(membershipPlanId, rest);
            break;
        }
        default:
            break;
    }
};
