import { BadRequestError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { IOtp } from "../../frameworks/types/otpInterface";
import { UserCreatedEventPublisher } from "../../frameworks/utils/kafka-events/publishers/user-created-publisher";
import { kafkaClient } from "../../config/kafka.connection";
import {
    createJwtAccessToken,
    createJwtRefreshToken,
} from "../../frameworks/utils/jwtToken";

export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) {
        throw new Error("usersRepository should exist in dependencies");
    }

    const execute = async ({ otp, email }: IOtp) => {
        
        let parsedOtp: number;
        typeof otp == "string"
        ? (parsedOtp = parseInt(otp))
        : (parsedOtp = otp);
        
        const user = await usersRepository.getByEmail(email);
        
        if (!user) throw new BadRequestError("Invalid email");
        
        console.log(" parsedOtp ", parsedOtp);
        console.log("user.otp  ", user.otp);


        if (user.otp !== parsedOtp) throw new BadRequestError("Invalid Otp");
        
        // delete otp
        await usersRepository.deleteOtp(email);
        console.log("parsedOtp ", typeof parsedOtp);
        
        // to update user verification status in users collection
        await usersRepository.updateVerification(email);
        console.log("email ", typeof email);
        
		
        // to produce a message to kafka topic
        const userCreatedEvent = new UserCreatedEventPublisher(kafkaClient);
        await userCreatedEvent.publish({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isActive: user.isActive,
            userId: user.id,
        });

        const jwtPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        // Generate Jwt key
        const accessToken = createJwtAccessToken(jwtPayload);
        const refreshToken = createJwtRefreshToken(jwtPayload);

        return {
            user,
            accessToken,
            refreshToken,
        };
    };

    return { execute };
};
