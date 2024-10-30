import { Request, Response } from 'express';
import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    const {
        useCases: { getCandidateProfileByIdUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userId } = req.currentUser!;
        const { candidateId } = req.params!;

        const candidate = await getCandidateProfileByIdUseCase(dependencies).execute(candidateId ?? userId);
        res.status(200).json({ message: 'candidate profile feched successfully', data: candidate });
    };
};
