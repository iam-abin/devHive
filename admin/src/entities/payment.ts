import { IPaymentData } from '../frameworks/types/payment';

export class Payment {
    candidateId: string;
    membershipPlanId: string;

    constructor({ candidateId, membershipPlanId }: IPaymentData) {
        this.candidateId = candidateId;
        this.membershipPlanId = membershipPlanId;
    }
}
