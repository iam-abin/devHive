import { Payment, PaymentData } from "../../../entities/payment";
import schemas from "../../database/models";

const { PaymentModel, MembershipPlansModel } = schemas;

export = {
	createPayment: async (data: PaymentData): Promise<any> => {
		console.log("inside createPayment fn in admin service", data);
		const paymentData = new Payment(data);
		console.log(
			"inside createPayment after new Payment fn in admin service",
			data
		);
		const paymentObject = PaymentModel.buildPayment(paymentData);
		return await paymentObject.save();
	},

	getById: async (paymentId: string) => {
		const payment = await PaymentModel.findById(paymentId);
		return payment;
	},

	totalRevenue: async () => {
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
			
			console.log("totalAmount ", totalAmount[0].sumOfAmount);
			return totalAmount[0].sumOfAmount;
		}else{
			console.log("totalAmount",totalAmount);
			
			return 0
		}

	},

	getAllPayments: async () => {
		const payments = await PaymentModel.find({})
			.populate({
				path: "candidateId",
				model: "Candidate",
			})
			.populate({
				path: "membershipPlanId",
				model: "MembershipPlan",
			});
		return payments;
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

		console.log("monthlyPayments payment ", monthlyPayments);
		return monthlyPayments
	},
};
