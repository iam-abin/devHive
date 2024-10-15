import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import {
    createJwtAccessToken,
    createJwtRefreshToken,
} from "../../frameworks/utils/jwtToken";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { UserCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-created-publisher";
import { kafkaClient } from "../../config/kafka-connection";
import { IOtp } from "../../frameworks/types/otp-nodemailer-interface";

export = (dependencies: IDependency) => {
    const {
        useCases: { checkEmailVerificationOtpUseCase, getUserByEmailUseCase },
    } = dependencies;

    return async (req: Request, res: Response) => {
        const { userData, candidateAccessToken, candidateRefreshToken } =
            await checkEmailVerificationOtpUseCase(dependencies).execute(
                req.body as IOtp
            );

        res.status(201).json({
            message: "user is registered successfully",
            data: userData,
            candidateAccessToken,
            candidateRefreshToken,
        });
    };
};
