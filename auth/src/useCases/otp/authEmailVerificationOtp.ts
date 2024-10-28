import { BadRequestError } from '@abijobportal/common';
import { IDependency } from '../../frameworks/types/dependency';
import { IOtp } from '../../frameworks/types/otp';
import { UserCreatedEventPublisher } from '../../frameworks/utils/kafka-events/publishers/user-created-publisher';
import { kafkaClient } from '../../config/kafka.connection';

export = (dependencies: IDependency) => {
    const {
        repositories: { usersRepository },
    } = dependencies;

    if (!usersRepository) {
        throw new Error('usersRepository should exist in dependencies');
    }

    const execute = async ({ otp, email }: IOtp) => {
        let parsedOtp: number;
        if (typeof otp == 'string') {
            parsedOtp = parseInt(otp);
        } else {
            parsedOtp = otp;
        }

        const user = await usersRepository.getByEmail(email);

        if (!user) throw new BadRequestError('Invalid email');

        if (user.otp !== parsedOtp) throw new BadRequestError('Invalid Otp');

        // delete otp
        await usersRepository.deleteOtp(email);
        // to update user verification status in users collection
        const result = await usersRepository.updateVerification(email);
        console.log("verifiedResult ",result);
        
        // to produce a message to kafka topic
        const userCreatedEvent = new UserCreatedEventPublisher(kafkaClient);
        await userCreatedEvent.publish({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isActive: user.isActive,
            userId: user._id,
        });

        return { user };
    };

    return { execute };
};
