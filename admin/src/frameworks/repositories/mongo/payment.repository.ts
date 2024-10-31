import { Payment } from '../../../entities/payment';
import { IPaymentDocument, PaymentModel } from '../../database/models';
import { IPaymentData } from '../../types/payment';

export = {
    createPayment: async (data: IPaymentData): Promise<IPaymentDocument> => {
        const paymentData = new Payment(data);
        const paymentObject = PaymentModel.buildPayment(paymentData);
        return await paymentObject.save();
    },

    getById: async (paymentId: string): Promise<IPaymentDocument | null> => {
        const payment = await PaymentModel.findById(paymentId);
        return payment;
    },

    totalRevenue: async (): Promise<number> => {
        const totalAmount: { sumOfAmount: number }[] = await PaymentModel.aggregate([
            {
                $lookup: {
                    from: 'membershipplans',
                    localField: 'membershipPlanId',
                    foreignField: '_id',
                    as: 'planDetails',
                },
            },
            {
                $unwind: '$planDetails', // unwind the array created by the $lookup
            },
            {
                $group: {
                    _id: 'null', // group by candidateId
                    sumOfAmount: { $sum: '$planDetails.price' }, // sum the prices for each candidate
                },
            },
            { $project: { sumOfAmount: 1, _id: 0 } },
        ]);

        if (totalAmount[0]) {
            return totalAmount[0].sumOfAmount;
        } else {
            return 0;
        }
    },

    // populate graph data for admin
    getGraphData: async () => {
        const monthlyPayments = await PaymentModel.aggregate([
            {
                $lookup: {
                    from: 'membershipplans',
                    localField: 'membershipPlanId',
                    foreignField: '_id',
                    as: 'planDetails',
                },
            },
            {
                $unwind: '$planDetails', // Unwind the planDetails array
            },
            {
                $group: {
                    // _id: { $month: '$createdAt' }, // Group by month
                    // planName: { $first: '$membershipPlan.name' }, // Include the name of the first membership plan in the group
                    _id: {
                        month: { $month: '$createdAt' }, // Group by month
                        planName: '$planDetails.name', // Group by planName
                    },
                    totalAmount: { $sum: '$planDetails.price' }, // Sum the amount for each group
                },
            },
            {
                $project: {
                    month: '$_id', // Rename _id to month
                    planName: '$_id.planName', // Extract planName from _id
                    totalAmount: 1, // Include totalAmount in the output
                    _id: 0, // Exclude _id from the output
                },
            },
            {
                $sort: { month: 1 }, // Sort by month
            },
        ]);

        return monthlyPayments;
    },

    getAllPayments: async (skip: number, limit: number): Promise<IPaymentDocument[] | []> => {
        const payments = await PaymentModel.find({})
            .skip(skip)
            .limit(limit)
            .populate('candidateId', ['name', 'email'])
            .populate('membershipPlanId', ['name', 'price']);
        return payments;
    },

    getCountOfPayments: async (): Promise<number> => {
        return await PaymentModel.countDocuments();
    },

    searchPayments: async (
        searchKey: string,
        skip: number,
        limit: number,
    ): Promise<IPaymentDocument[] | []> => {
        return await PaymentModel.aggregate([
            {
                $lookup: {
                    from: 'candidates',
                    foreignField: '_id',
                    localField: 'candidateId',
                    as: 'candidate',
                },
            },
            {
                $lookup: {
                    from: 'membershipplans',
                    foreignField: '_id',
                    localField: 'membershipPlanId',
                    as: 'membershipPlan',
                },
            },
            {
                $unwind: {
                    path: "$candidate",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$membershipPlan",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    candidateId: {
                        _id: "$candidate._id",
                        name: "$candidate.name",
                        email: "$candidate.email",
                    },
                    membershipPlanId: {
                        _id: "$membershipPlan._id",
                        name: "$membershipPlan.name",
                        price: "$membershipPlan.price",
                    },
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
            {
                $match: {
                    'candidateId.name': {
                        $regex: new RegExp(searchKey, 'i'),
                    },
                },
            },
            { $skip: skip },
            { $limit: limit },
        ]);
    },

    getCountOfSearchedPayments: async (searchKey: string): Promise<number> => {
        const result = await PaymentModel.aggregate([
            {
                $lookup: {
                    from: 'candidates',
                    foreignField: '_id',
                    localField: 'candidateId',
                    as: 'candidate',
                },
            },
            {
                $unwind: {
                    path: "$candidate",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    'candidate.name': {
                        $regex: new RegExp(searchKey, 'i'),
                    },
                },
            },
            {
                $count: "totalCount"
            }
        ]);
    
        return result[0]?.totalCount || 0;
    },
};
