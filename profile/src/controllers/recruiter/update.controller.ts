import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';
import { IRecruiterProfile } from '../../frameworks/types/recruiter';

export = (dependencies: IDependency) => {
    const {
        useCases: { updateRecruiterProfileUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const updatedData = req.body as Partial<IRecruiterProfile>;
        const { userId } = req.currentUser!;

        const recruiter = await updateRecruiterProfileUseCase(dependencies).execute(userId, updatedData);

        res.status(200).json({ message: 'recruiter data', data: recruiter });
    };
};
