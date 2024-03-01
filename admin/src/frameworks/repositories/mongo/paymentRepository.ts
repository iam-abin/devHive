import schemas from "../../database/models";

const { PaymentModel } = schemas;

export = {
	createPayment: async (paymentData: any): Promise<any> => {
		console.log("inside createPayment fn in admin service", paymentData);

		const paymentObject = PaymentModel.buildPayment(paymentData);
		return await paymentObject.save();
	},

	getById: async (paymentId: string) => {
		const payment = await PaymentModel.findById(paymentId);
		return payment;
	},

	getAllPayments: async () => {
		const payments = await PaymentModel.find({});
		return payments;
	},
};
