import Models from '../../database/mongo/models';
import { IPaymentDocument } from '../../database/mongo/models/payment';

const { PaymentModel } = Models;

export = {
    createPayment: async ({
        candidateId,
        stripeId,
        membershipPlanId,
    }: {
        candidateId: string;
        stripeId: string;
        membershipPlanId: string;
    }): Promise<IPaymentDocument> => {
        const payment = PaymentModel.buildPayment({
            candidateId,
            membershipPlanId,
            stripeId,
        });

        return await payment.save();
    },
};
