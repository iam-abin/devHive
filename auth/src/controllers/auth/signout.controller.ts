import { Request, Response } from 'express';

export = () => {
    return async (req: Request, res: Response) => {
        res.status(200).json({ message: `${req.currentUser.role} successfully logged out` });
    };
};
