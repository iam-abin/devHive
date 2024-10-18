import createJobUseCase from "./createJob";
import updateJobUseCase from "./updateJob";
import deleteJobUseCase from "./deleteJob";
import getRecruiterCreatedJobsUseCase from "./getCreatedJobs";
import getAllJobApplicationsUseCase from "./get-all-job-applications";
import getAJobApplicationUseCase from "../job/getApplication";
import changeJobApplicationStatusUseCase from "./change-job-application-status";
import changeClosejobStatusUseCase from "./change-closejob-status";
import recruiterDashboardCardsDetailsUseCase from "./dashboardCardsDetails";
import recruiterDashboardGraphDetailsUseCase from "./dashboardGraphDetails";

export {
	createJobUseCase,
	updateJobUseCase,
	deleteJobUseCase,
	getAllJobApplicationsUseCase,
	getRecruiterCreatedJobsUseCase,
	getAJobApplicationUseCase,
	changeJobApplicationStatusUseCase,
	changeClosejobStatusUseCase,
	recruiterDashboardCardsDetailsUseCase,
	recruiterDashboardGraphDetailsUseCase,
};
