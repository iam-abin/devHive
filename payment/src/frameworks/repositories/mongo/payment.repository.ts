import schemas from "../../database/mongo/models";

const { PaymentModel } = schemas;

export = {
	createPayment: async ({
		candidateId,
		stripeId,
		membershipPlanId,
	}: {
		candidateId: string;
		stripeId: string;
		membershipPlanId: string;
	}) => {
		const payment = PaymentModel.buildPayment({
			candidateId,
			membershipPlanId,
			stripeId,
		});
		
		return await payment.save();
	},
};
