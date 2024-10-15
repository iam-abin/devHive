import { Request, Response } from "express";

import { IDependency } from "../../frameworks/types/dependencyInterface";
import { ISignup } from "../../frameworks/types/userInterface";

export = (dependencies: IDependency) => {
    const {
        useCases: { signupUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const message: { message: string } = await signupUseCase(
            dependencies
        ).execute(req.body as ISignup);

		
        return res.status(200).json(message);
    };
};
