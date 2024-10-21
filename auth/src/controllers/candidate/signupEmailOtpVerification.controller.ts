import { Request, Response } from "express";
import { IDependency } from "../../frameworks/types/dependency";
import { IOtp } from "../../frameworks/types/otp";

export = (dependencies: IDependency) => {
    const {
        useCases: { authEmailVerificationOtpUseCase, getUserByEmailUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        console.log("req.body ",req.body);
        
        const verifiedData =
            await authEmailVerificationOtpUseCase(dependencies).execute(
                req.body as IOtp
            );

        res.status(201).json({
            message: "user is registered successfully",
            data: verifiedData
        });
    };
};
