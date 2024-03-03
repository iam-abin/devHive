export interface jobApplicationInterface {
	jobId: string;
	candidateId: string;
	recruiterId: string;
	applicationStatus: string;
}

export class JobApplication {
	jobId: string;
	candidateId: string;
	recruiterId: string;
	applicationStatus: string;

	constructor({
		jobId,
		candidateId,
		recruiterId,
		applicationStatus,
	}: jobApplicationInterface) {

		(this.jobId = jobId),
        (this.candidateId = candidateId),
        (this.recruiterId = recruiterId),
        (this.applicationStatus = applicationStatus);
	}
}
