import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getJobByIdUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { id } = req.params;
        // const {userId} = req.currentUser!
        // console.log(userId,"===========");

        const job = await getJobByIdUseCase(dependencies).execute(id);
        res.status(200).json({ message: 'Job get successfully', data: job });
    };
};
