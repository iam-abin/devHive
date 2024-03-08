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

	totalRevenue: async() =>{
		const totalAmount:any = await PaymentModel.aggregate([
			{
			  $lookup: {
				from: 'membershipplans',
				localField: 'membershipPlanId',
				foreignField: '_id',
				as: 'planDetails'
			  }
			},
			{
			  $unwind: '$planDetails' // unwind the array created by the $lookup
			},
			{
			  $group: {
				_id: 'null', // group by candidateId
				sumOfAmount: { $sum: '$planDetails.price' } // sum the prices for each candidate
			  }
			},{$project:{sumOfAmount: 1,_id: 0}}
		  ])
		  
		  console.log("totalAmount ",totalAmount[0].sumOfAmount);
		  
		return totalAmount[0].sumOfAmount
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
