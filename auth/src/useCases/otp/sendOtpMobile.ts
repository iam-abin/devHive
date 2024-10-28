import { BadRequestError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';
import { IMobileOtp } from '../../frameworks/types/otp';

import { sendOtp } from '../../frameworks/utils/twilio';

// used in forgot password
export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) {
        throw new Error('usersRepository should exist in dependencies');
    }

    const execute = async ({ email, phone }: Omit<IMobileOtp, 'otp'>) => {
        const user = await usersRepository.getByEmail(email);

        if (!user) throw new BadRequestError('Invalid email');
        if (typeof phone === 'string') phone = parseInt(phone);
        if (user.phone !== phone) throw new BadRequestError('User with this phone number does not exist');

        // sendOtp
        const otpData = await sendOtp(phone);
        return otpData;
    };

    return { execute };
};
