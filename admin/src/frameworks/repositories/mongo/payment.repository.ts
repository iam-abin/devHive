import { Payment } from "../../../entities/payment";
import { IPaymentDocument, PaymentModel } from "../../database/models";
import { IPaymentData } from "../../types/payment";

export = {
	createPayment: async (data: IPaymentData): Promise<IPaymentDocument> => {
		const paymentData = new Payment(data);
		const paymentObject = PaymentModel.buildPayment(paymentData);
		return await paymentObject.save();
	},

	getById: async (paymentId: string): Promise<IPaymentDocument| null> => {
		const payment = await PaymentModel.findById(paymentId);
		return payment;
	},

	totalRevenue: async (): Promise<number> => {
		const totalAmount: any = await PaymentModel.aggregate([
			{
				$lookup: {
					from: "membershipplans",
					localField: "membershipPlanId",
					foreignField: "_id",
					as: "planDetails",
				},
			},
			{
				$unwind: "$planDetails", // unwind the array created by the $lookup
			},
			{
				$group: {
					_id: "null", // group by candidateId
					sumOfAmount: { $sum: "$planDetails.price" }, // sum the prices for each candidate
				},
			},
			{ $project: { sumOfAmount: 1, _id: 0 } },
		]);

		if (totalAmount[0]) {
			return totalAmount[0].sumOfAmount;
		}else{
			return 0
		}

	},

	getAllPayments: async (skip: number, limit: number): Promise<IPaymentDocument[] | []> => {
		const payments = await PaymentModel.find({}).skip(skip).limit(limit)
			.populate("candidateId", ["name","email"])
			.populate("membershipPlanId", ["name", "price"]);
		return payments;
	},
	
	getCountOfPayments: async(): Promise<number>=>{
		return await PaymentModel.countDocuments();
	},

	// populate graph data for admin
	getGraphData: async () => {
		const monthlyPayments = await PaymentModel.aggregate([
			{
			  $lookup: {
				from: "membershipplans",
				localField: "membershipPlanId",
				foreignField: "_id",
				as: "planDetails",
			},
			},
			{
			  $unwind: '$planDetails' // Unwind the planDetails array
			},
			{
			  $group: {
				// _id: { $month: '$createdAt' }, // Group by month
				// planName: { $first: '$membershipPlan.name' }, // Include the name of the first membership plan in the group
				_id: {
					month: { $month: '$createdAt' }, // Group by month
					planName: '$planDetails.name' // Group by planName
				  },
				totalAmount: { $sum: '$planDetails.price' } // Sum the amount for each group
			  }
			},
			{
			  $project: {
				month: '$_id', // Rename _id to month
				planName: '$_id.planName', // Extract planName from _id
				totalAmount: 1, // Include totalAmount in the output
				_id: 0 // Exclude _id from the output
			  }
			},
			{
			  $sort: { month: 1 } // Sort by month
			}
		  ]);
		  
		return monthlyPayments
	},
};
