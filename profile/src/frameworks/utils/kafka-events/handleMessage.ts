import candidateProfileRepository from '../../repository/mongo/candidateProfile.repository';
import recruiterProfileRepository from '../../repository/mongo/recruiterProfile.repository';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMessage = (data: any, topic: string) => {
    switch (topic) {
        case 'USER-CREATED-TOPIC':
            if (data.role === 'candidate') {
                candidateProfileRepository.createCandidateProfile(data);
            } else if (data.role === 'recruiter') {
                recruiterProfileRepository.createRecruiterProfile(data);
            }
            break;

        case 'USER-UPDATED-TOPIC':
            if (data.role === 'candidate') {
                candidateProfileRepository.updateCandidateProfile(data.userId, data);
            } else if (data.role === 'recruiter') {
                recruiterProfileRepository.updateRecruiterProfile(data.userId, data);
            }
            break;

        case 'PAYMENT-CREATED-TOPIC':
            candidateProfileRepository.premiumPaymentDone(data);
            break;

        default:
            break;
    }
};
