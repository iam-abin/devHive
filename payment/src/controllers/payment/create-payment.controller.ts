import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { PremiumPaymentDonePublisher } from "../../frameworks/utils/kafka-events/publishers/payment-done-publisher";
import { kafkaClient } from "../../config/kafka-connection";

export = (dependencies: IDependency) => {
	const {
		useCases: { createPaymentUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {

		const { membershipPlanId, amount } = req.body;
		let candidateId = req.currentUser!.userId;
		
		const paymentCreated = await createPaymentUseCase(dependencies).execute( candidateId, amount );
		
		const paymentCreatedEvent = new PremiumPaymentDonePublisher(kafkaClient);
		
		await paymentCreatedEvent.publish({
			candidateId,
			membershipPlanId,
		})

		res.status(200).json({
			message: "Payment successFull",
			data: paymentCreated,
		});
	};
};
