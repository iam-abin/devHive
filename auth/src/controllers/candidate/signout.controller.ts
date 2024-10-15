import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependency) => {
    return async (req: Request, res: Response) => {
        res.status(200).json({ message: "candidate successfully logged out" });
    };
};
