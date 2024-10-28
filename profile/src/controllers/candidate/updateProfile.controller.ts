import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { updateCandidateProfileUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const updateData = req.body;
        const { userId } = req.currentUser;

        const candidate = await updateCandidateProfileUseCase(dependencies).execute(userId, updateData);

        res.status(200).json({ message: 'candidate updated successfully', data: candidate });
    };
};
