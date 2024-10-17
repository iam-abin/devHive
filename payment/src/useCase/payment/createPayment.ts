import { config } from "../../config/appConfig";
import { kafkaClient } from "../../config/kafka.connection";
import { stripeInstance } from "../../config/stripe";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { PremiumPaymentDonePublisher } from "../../frameworks/utils/kafka-events/publishers/payment-done-publisher";

export = (dependencies: IDependency) => {
	const {
		repositories: { paymentRepository },
	} = dependencies;

	if (!paymentRepository) throw new Error("paymentRepository should exist in dependencies");

	const execute = async (candidateId: string, membershipPlanId: string, amount: number):Promise<any> => {
		// const paymentIntent = await stripeInstance.checkout.sessions.create({
		// 	amount: amount,
		// 	currency: "usd",
		// 	payment_method_types: ["card"],
		// });

		const session = await stripeInstance.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "inr",
						product_data: {
							name: "premium",
						},
						unit_amount: amount * 100, // Amount in cents (299 INR * 100)
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: config.PAYMENT_SUCCESS_URL,
			cancel_url: config.PAYMENT_CANCEL_URL,
		});

		//   return session
		await paymentRepository.createPayment({
			candidateId,
			membershipPlanId,
			stripeId: session.id,
		});

		const paymentCreatedEvent = new PremiumPaymentDonePublisher(kafkaClient);
		
		await paymentCreatedEvent.publish({
			candidateId,
			membershipPlanId,
		})

		return 
	};

	return { execute };
};
