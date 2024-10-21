import { IPayment } from "../frameworks/types/payment";

export class Payment {
	candidateId: string;
	membershipPlanId: string;
	stripeId: string;

	constructor({ candidateId, membershipPlanId, stripeId }: IPayment) {
		this.candidateId = candidateId;
		this.membershipPlanId = membershipPlanId;
		this.stripeId = stripeId;
	}
}
