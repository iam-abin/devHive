import { BadRequestError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';
import { IOtp } from '../../frameworks/types/otp';

// used in forgot password
export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) {
        throw new Error('usersRepository should exist in dependencies');
    }

    const execute = async ({ email, otp }: IOtp) => {
        let parsedOtp: number;
        if (typeof otp === 'string') {
            parsedOtp = parseInt(otp);
        } else {
            parsedOtp = otp;
        }

        const user = await usersRepository.getByEmail(email);

        if (!user) throw new BadRequestError('Invalid email');

        if (user.otp != parsedOtp) throw new BadRequestError('Invalid Otp');

        // delete otp
        await usersRepository.deleteOtp(email);

        return user;
    };

    return { execute };
};
