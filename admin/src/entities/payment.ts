export interface IPaymentData {
	candidateId: string;
	membershipPlanId: string;
	stripeId?: string;
}

export class Payment {
	candidateId: string;
	membershipPlanId: string;
	stripeId?: string;

	constructor({ candidateId, membershipPlanId, stripeId }: IPaymentData) {
		this.candidateId = candidateId;
		this.membershipPlanId = membershipPlanId;
		this.stripeId = stripeId;
	}
}
