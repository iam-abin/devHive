import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getRecruiterProfileByIdUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser!;
        const { recruiterId } = req.params!;
        const recruiter = await getRecruiterProfileByIdUseCase(dependencies).execute(recruiterId ?? userId);

        res.status(200).json({ message: 'recruiter data', data: recruiter });
    };
};
