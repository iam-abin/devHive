import { NotFoundError } from '@abijobportal/common';
import { appConfig } from '../../config/appConfig';
import { kafkaClient } from '../../config/kafka.connection';
import { stripeInstance } from '../../config/stripe';
import { IDependency } from '../../frameworks/types/dependency';
import { PremiumPaymentDonePublisher } from '../../frameworks/utils/kafka-events/publishers/paymentDonePublisher';

export = (dependencies: IDependency) => {
    const {
        repositories: { paymentRepository, membershipRepository },
    } = dependencies;

    if (!paymentRepository) throw new Error('paymentRepository should exist in dependencies');

    const execute = async (candidateId: string, membershipPlanId: string, amount: number) => {
        const plan = await membershipRepository.getById(membershipPlanId);
        if (!plan) throw new NotFoundError('Membership plan not found');

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'premium',
                        },
                        unit_amount: amount * 100, // Amount in cents (299 INR * 100)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: appConfig.PAYMENT_SUCCESS_URL,
            cancel_url: appConfig.PAYMENT_CANCEL_URL,
        });

        const paymentCreatedEvent = new PremiumPaymentDonePublisher(kafkaClient);

        await paymentCreatedEvent.publish({
            candidateId,
            membershipPlanId,
        });
        //   return session
        return await paymentRepository.createPayment({
            candidateId,
            membershipPlanId,
            stripeId: session.id,
        });
    };

    return { execute };
};
