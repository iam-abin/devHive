import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { PremiumPaymentDonePublisher } from "../../frameworks/utils/kafka-events/publishers/payment-done-publisher";
import { kafkaClient } from "../../config/kafka-connection";
import { Payment } from "../../entities/payment";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { createPaymentUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {

		const { membershipPlanId, amount } = req.body;
		let candidateId = req.currentUserCandidate!.id;
		
		const paymentCreated = await createPaymentUseCase(dependencies).execute(
            candidateId,
			amount,
		);
		
		const paymentCreatedEvent = new PremiumPaymentDonePublisher(kafkaClient);
		
		await paymentCreatedEvent.publish({
			candidateId,
			membershipPlanId,
			// stripeId
		})

		res.status(200).json({
			message: "Payment successFull",
			data: paymentCreated,
		});
	};
};
