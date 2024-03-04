import { Payment, PaymentData } from "../../../entities/payment";
import schemas from "../../database/models";

const { PaymentModel } = schemas;

export = {
	createPayment: async (data: PaymentData): Promise<any> => {
		console.log("inside createPayment fn in admin service", data);
		const paymentData = new Payment(data);
		console.log("inside createPayment after new Payment fn in admin service", data);
		const paymentObject = PaymentModel.buildPayment(paymentData);
		return await paymentObject.save();
	},

	getById: async (paymentId: string) => {
		const payment = await PaymentModel.findById(paymentId);
		return payment;
	},

	getAllPayments: async () => {
		const payments = await PaymentModel.find({})
		.populate({
				path: 'candidateId',
				model: 'Candidate'
			})
		.populate({
			path: 'membershipPlanId',
			model: 'MembershipPlan'
		})
		return payments;
	},
};
