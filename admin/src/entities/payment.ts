export interface PaymentData {
	candidateId: string;
	membershipPlanId: string;
	stripeId?: string;
}

export class Payment {
	candidateId: string;
	membershipPlanId: string;
	stripeId?: string;

	constructor({ candidateId, membershipPlanId, stripeId }: PaymentData) {
		this.candidateId = candidateId;
		this.membershipPlanId = membershipPlanId;
		this.stripeId = stripeId;
	}
}
