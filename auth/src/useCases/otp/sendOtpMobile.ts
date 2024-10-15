import { BadRequestError } from "@abijobportal/common";
import { IDependency } from "../../frameworks/types/dependencyInterface";
import { IMobileOtp } from "../../frameworks/types/otpInterface";

import { sendOtp } from "../../frameworks/utils/twilio";

// used in forgot password
export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) {
        throw new Error("usersRepository should exist in dependencies");
    }

    const execute = async ({ email, phone }: Omit<IMobileOtp, "otp">) => {
        const user = await usersRepository.getByEmail(email);

        if (!user) throw new BadRequestError("Invalid email");

        if (user.phone !== phone)
            throw new BadRequestError(
                "User with this phone number does not exist"
            );
            
        // sendOtp
        const otpData = await sendOtp(phone);
        console.log(otpData);
        

        return otpData;
    };

    return { execute };
};
