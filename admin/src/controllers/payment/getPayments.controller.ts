import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getAllPaymentsUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { payments, numberOfPages } = await getAllPaymentsUseCase(dependencies).execute(
            Number(req.params.page) || 1,
            Number(req.params.limit) || 4,
        );
        res.status(200).json({ message: 'Payments are ', data: { payments, numberOfPages } });
    };
};
