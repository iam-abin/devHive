import jobRepository from '../../repositories/mongo/job.repository';
import userRepository from '../../repositories/mongo/user.repository';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const handleMessage = (data: any, topic: string) => {
    switch (topic) {
        case 'JOB-UPDATED-TOPIC': {
            const { jobId } = data;
            jobRepository.updateJob(jobId, data);
            break;
        }

        case 'USER-CREATED-TOPIC':
            userRepository.createUser(data);
            break;

        case 'USER-UPDATED-TOPIC':
            userRepository.updateUser(data.userId, data);
            break;

        case 'PREMIUM-PAYMENT-TOPIC':
            userRepository.premiumPaymentDone(data.candidateId);
            break;

        default:
            break;
    }
};
