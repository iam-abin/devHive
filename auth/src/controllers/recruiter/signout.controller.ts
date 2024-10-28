import { Request, Response } from 'express';

export = () => {
    return async (req: Request, res: Response) => {
        res.status(200).json({ message: 'recruiter successfully logged out' });
    };
};
