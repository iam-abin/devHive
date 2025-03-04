import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';
import { IJwtPayload } from '@abijobportal/common';

export = (dependencies: IDependency) => {
    const {
        useCases: { createPaymentUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { membershipPlanId, amount } = req.body;
        const { userId: candidateId } = req.currentUser as IJwtPayload;
        
        const paymentCreated = await createPaymentUseCase(dependencies).execute(
            candidateId,
            membershipPlanId,
            amount,
        );

        res.status(200).json({
            message: 'Payment successFull',
            data: paymentCreated,
        });
    };
};
