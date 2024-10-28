import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';
import { IMembershipPlan } from '../../frameworks/types/membershipPlan';

export = (dependencies: IDependency) => {
    const {
        useCases: { createMemberShipPlanUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const data = req.body as IMembershipPlan;

        const membershipPlan = await createMemberShipPlanUseCase(dependencies).execute(data);

        res.status(201).json({ message: 'MemberShipPlan created successfully', data: membershipPlan });
    };
};
