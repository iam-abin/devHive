import candidateRepository from '../../repositories/mongo/candidate.repository';
import recruiterRepository from '../../repositories/mongo/recruiter.repository';
import jobRepository from '../../repositories/mongo/job.repository';
import paymentRepository from '../../repositories/mongo/payment.repository';
import { ROLES } from '@abijobportal/common';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const handleMessage = (data: any, topic: string) => {
    switch (topic) {
        case 'USER-CREATED-TOPIC':
            if (data.role === ROLES.CANDIDATE) {
                candidateRepository.createCandidate(data);
            } else if (data.role === ROLES.RECRUITER) {
                recruiterRepository.createRecruiter(data);
            }
            break;

        case 'USER-UPDATED-TOPIC':
            if (data.role === ROLES.CANDIDATE) {
                candidateRepository.updateCandidateProfile(data.userId, data);
            } else if (data.role === ROLES.RECRUITER) {
                recruiterRepository.updateRecruiterProfile(data.userId, data);
            }

            break;

        case 'CANDIDATE-PROFILE-CREATED-TOPIC':
            candidateRepository.createCandidate(data);
            break;

        case 'CANDIDATE-PROFILE-UPDATED-TOPIC':
            candidateRepository.updateCandidateProfile(data.userId, data);

            break;

        case 'RECRUITER-PROFILE-CREATED-TOPIC':
            recruiterRepository.createRecruiter(data);

            break;

        case 'RECRUITER-PROFILE-UPDATED-TOPIC':
            recruiterRepository.updateRecruiterProfile(data.userId, data);

            break;

        case 'JOB-CREATED-TOPIC':
            jobRepository.createJob(data);

            break;

        case 'JOB-UPDATED-TOPIC':
            jobRepository.updateJob(data.jobId, data);

            break;

        case 'JOB-DELETED-TOPIC':
            jobRepository.deleteJob(data.jobId);
            break;

        case 'PAYMENT-CREATED-TOPIC':
            paymentRepository.createPayment(data);

            break;

        default:
            break;
    }
};
