import { BadRequestError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';
import { IMobileOtp } from '../../frameworks/types/otp';
import { verifyOtp } from '../../frameworks/utils/twilio';

// used in forgot password
export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) {
        throw new Error('usersRepository should exist in dependencies');
    }

    const execute = async ({ email, otp, phone }: IMobileOtp) => {
        const user = await usersRepository.getByEmail(email);

        if (!user) throw new BadRequestError('User with this phone number does not exist');
        if (user.phone !== phone) throw new BadRequestError('User with this phone number does not exist');

        const verifyOtpData: string = await verifyOtp(phone, otp);
        if (verifyOtpData === 'pending') {
            throw new BadRequestError('Invalid Otp');
        }

        return user;
    };

    return { execute };
};
