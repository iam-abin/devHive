import { BadRequestError } from '@abijobportal/common';
import { User } from '../../entities';
import { IDependency } from '../../frameworks/types/dependency';
import { ISignup } from '../../frameworks/types/user';
import { generateEmailVerificationOtp, sendVerificationEmail } from '../../frameworks/utils/sendEmail';

export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) {
        throw new Error('usersRepository should exist in dependencies');
    }

    const execute = async ({ name, email, phone, password, role }: ISignup) => {
        const isExistingUser = await usersRepository.getByEmail(email);

        if (isExistingUser && isExistingUser.isVarified) throw new BadRequestError('Email already exist');

        const subject = 'Verify Your Email';
        const topic = 'Enter the 6 digit otp to verify your email';

        if (isExistingUser && !isExistingUser.isVarified) {
            await sendVerificationEmail(email, isExistingUser.otp, subject, topic);

            return {
                message: `An email is send to ${email}, please verify.`,
            };
        }

        const { otp } = generateEmailVerificationOtp();
        console.log(otp);

        const user = new User({
            name,
            email,
            phone,
            password,
            role,
            otp: parseInt(otp),
        });
        console.log(user);

        await usersRepository.register(user);

        await sendVerificationEmail(email, otp, subject, topic);

        return {
            message: `An email is send to ${email}, please verify.`,
        };
    };

    return { execute };
};
