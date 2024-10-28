import { BadRequestError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';
import { IOtp } from '../../frameworks/types/otp';
import { generateEmailVerificationOtp, sendVerificationEmail } from '../../frameworks/utils/sendEmail';

// used in forgot password
export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) {
        throw new Error('usersRepository should exist in dependencies');
    }

    const execute = async ({ email }: Omit<IOtp, 'otp'>) => {
        const user = await usersRepository.getByEmail(email);

        if (!user) throw new BadRequestError('Invalid email');

        const { otp } = generateEmailVerificationOtp();

        // To add the otp to db
        await usersRepository.setOtp(email, otp);

        const subject = 'Verify Your Email';
        const topic = 'Enter the 6 digit otp to verify your email';
        // sendOtp
        await sendVerificationEmail(email, otp, subject, topic);

        return user;
    };

    return { execute };
};
