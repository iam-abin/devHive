import { IJobApplication } from '../frameworks/types/jobApplication';

export class JobApplication {
    jobId: string;
    candidateId: string;
    recruiterId: string;
    applicationStatus: string;

    constructor({ jobId, candidateId, recruiterId, applicationStatus }: IJobApplication) {
        this.jobId = jobId;
        this.candidateId = candidateId;
        this.recruiterId = recruiterId;
        this.applicationStatus = applicationStatus;
    }
}
