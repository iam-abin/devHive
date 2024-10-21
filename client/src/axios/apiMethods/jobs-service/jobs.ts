
import jobApiUrlConfig from "../../../config/apiUrlsConfig/jobApiUrlConfig";
import { IResponse } from "../../../types/api";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";


export const getAllJobsApi = async (page: number): Promise<IResponse> => {
    return await candidateApiCalls("get", jobApiUrlConfig.getAllJobsUrl(page));
};

export const filterJobsApi = async (filterData: any): Promise<IResponse> => {
    return await candidateApiCalls("post", jobApiUrlConfig.filterJobsUrl, filterData);
};



export const getAllRecruiterAddedJobsApi = async (recruiterId: string): Promise<IResponse> => {
    return await recruiterApiCalls("get", jobApiUrlConfig.getAllRecruiterAddedJobsUrl(recruiterId));
};

export const getJobFieldsValuesApi = async (fields: any): Promise<IResponse> => {
    return await recruiterApiCalls("post", jobApiUrlConfig.getJobFieldsDistinctValuesUrl, fields);
};


export const getAJobApi = async (id: string): Promise<IResponse> => {
    return await recruiterApiCalls("get", jobApiUrlConfig.getAJobUrl(id));
};

export const createJobApi = async (data: any): Promise<IResponse> => {
    return await recruiterApiCalls("post", jobApiUrlConfig.createJobUrl, data);
};

export const updateJobApi = async (data: any): Promise<IResponse> => {
    return await recruiterApiCalls("put", jobApiUrlConfig.updateJobUrl, data);
};

export const changeJobCloseStatusApi = async (jobId: string): Promise<IResponse> => {
    return await recruiterApiCalls("patch", jobApiUrlConfig.changeJobCloseStatusUrl(jobId));
};


export const deleteAJobApi = async (id: string): Promise<IResponse> => {
    return await recruiterApiCalls("delete", jobApiUrlConfig.deleteAJobUrl(id));
};

export const candidateApplyJobApi = async (jobId: string): Promise<IResponse> => {
    return await candidateApiCalls("post", jobApiUrlConfig.candidateApplyJobUrl(jobId));

};

export const getAllJobsApplicationsForRecruiterApi = async (recruiterId: string): Promise<IResponse> => {
    return await recruiterApiCalls("get", jobApiUrlConfig.getAllJobsApplicationsForRecruiterUrl(recruiterId));
};



export const getAJobApplicationApi = async (jobApplicationId: string): Promise<IResponse> => {
    return await recruiterApiCalls("get", jobApiUrlConfig.getAJobApplicationUrl(jobApplicationId));
};

export const getAnAppliedJobApi = async (jobApplicationId: string): Promise<IResponse> => {
    return await candidateApiCalls("get", jobApiUrlConfig.getAnAppliedJobUrl(jobApplicationId));
};

export const getAllCandidateAppliedJobsApi = async (candidateId: string, currentPage: number): Promise<IResponse> => {
   return await candidateApiCalls("get", jobApiUrlConfig.getAllCandidateAppliedJobsUrl(candidateId, currentPage));
};

export const changeJobApplicationStatusApi = async (jobApplicationId: string, jobApplicationStatus: any): Promise<IResponse> => {
    return await recruiterApiCalls("post", jobApiUrlConfig.changeJobApplicationStatusUrl(jobApplicationId), jobApplicationStatus);
};

export const getRecruiterDashboadGraphApi = async (recruiterId: string): Promise<IResponse>=>{
    return  await recruiterApiCalls("get", jobApiUrlConfig.getRecruiterDashboadGraphUrl(recruiterId))
}

export const getRecruiterDashboardCardsApi = async (recruiterId: string): Promise<IResponse> => {
    return await recruiterApiCalls("get", jobApiUrlConfig.getRecruiterDashboardCardsUrl(recruiterId));
};

export const editJobApi = async (jobId: string, jobData: any): Promise<IResponse> => {
    return await recruiterApiCalls("patch", jobApiUrlConfig.editJobUrl(jobId), jobData);
};
