import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";
import { stripeInstance } from "../../config/stripe";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { createPaymentUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		// const {chatRoomId} = req.body
		const { amount } = req.body;
		let candidateId = req.currentUserCandidate!.id;

		console.log("in  paymentCreated controller 1: ", amount);
		

		const paymentCreated = await createPaymentUseCase(dependencies).execute(
            candidateId,
			amount,
		);
		console.log("in  paymentCreated controller 2: ", paymentCreated);

		res.status(200).json({
			message: "Payment successFull",
			data: paymentCreated,
		});
	};
};
