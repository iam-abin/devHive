import {
	getAllJobsCandidateUseCase,
	getJobByIdCandidateUseCase,
	filterJobCandidateUseCase,
	applyJobUseCase,
} from "./candidate"


import {
    createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobsRecruiterUseCase,
	getJobByIdRecruiterUseCase,
	filterJobRecruiterUseCase,
} from "./recruiter"


export default {
    getAllJobsCandidateUseCase,
	getJobByIdCandidateUseCase,
	filterJobCandidateUseCase,
	applyJobUseCase,

    createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobsRecruiterUseCase,
	getJobByIdRecruiterUseCase,
	filterJobRecruiterUseCase,
}