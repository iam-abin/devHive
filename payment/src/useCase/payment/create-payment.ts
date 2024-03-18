import { stripeInstance } from "../../config/stripe";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { paymentRepository },
	} = dependencies;

	if (!paymentRepository) {
		throw new Error("paymentRepository should exist in dependencies");
	}

	const execute = async (candidateId: string, amount: number) => {
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
			// success_url: `https://devhive.dev/candidate/payment-success`,
			// cancel_url: `https://devhive.dev/candidate/payment-failed`,
			success_url: `https://abinvarghese.online/candidate/payment-success`,
			cancel_url: `https://abinvarghese.online/candidate/payment-failed`,
		});

		//   return session
		return paymentRepository.createPayment({
			candidateId,
			stripeId: session.id,
		});
	};

	return { execute };
};
