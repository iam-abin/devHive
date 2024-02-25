import schemas from "../../database/mongo/models";

const { PaymentModel } = schemas;

export = {
	
	createPayment: async ({candidateId,  stripeId}:{candidateId: string,  stripeId: string} ) => {
		const payment = PaymentModel.buildPayment({candidateId,  stripeId});
		console.log("inside create payment repo", payment);

		return await payment.save();
	},
};
