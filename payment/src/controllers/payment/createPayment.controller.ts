import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";

export = (dependencies: IDependency) => {
    const {
        useCases: { createPaymentUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { membershipPlanId, amount } = req.body;
        let { userId: candidateId } = req.currentUser!;

        const paymentCreated = await createPaymentUseCase(dependencies).execute(
            candidateId,
            membershipPlanId,
            amount
        );

        res.status(200).json({
            message: "Payment successFull",
            data: paymentCreated,
        });
    };
};
