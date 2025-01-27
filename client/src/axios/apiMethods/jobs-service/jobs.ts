
import jobApiUrlConfig from "../../../config/apiUrlsConfig/jobApiUrlConfig";
import { IResponse } from "../../../types/api";
import { IFilter, IJob } from "../../../types/Job";
import makeApiCall from "../../apiCalls";


// Common for landing page and candidate
export const getAllJobsApi = async (page: number): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAllJobsUrl(page));
};

export const getJobFilterBarValuesApi = async (fields: string[]): Promise<IResponse> => {
    return await makeApiCall("post", jobApiUrlConfig.getJobFilterBarValuesUrl, fields);
};


export const filterJobsApi = async (filterData: IFilter, page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("post", jobApiUrlConfig.filterJobsUrl(page,limit), filterData);
};

// Candidate
export const getAJobCandidateApi = async (jobId: string): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAJobCandidateUrl(jobId));
};

export const searchJobsCandidateApi = async (searchKey: string, resourceType: string, page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getSearchResultsUrl(searchKey, resourceType, page, limit));
};

export const candidateApplyJobApi = async (jobId: string): Promise<IResponse> => {
    return await makeApiCall("post", jobApiUrlConfig.candidateApplyJobUrl(jobId));
};

export const checkJobAppliedApi = async (jobId: string): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.checkAppliedUrl(jobId));
};

export const getAllJobsApplicationsForRecruiterApi = async ( page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAllJobsApplicationsForRecruiterUrl(page, limit));
};



export const getAJobApplicationApi = async (jobApplicationId: string): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAJobApplicationUrl(jobApplicationId));
};

export const getAnAppliedJobApi = async (jobApplicationId: string): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAnAppliedJobUrl(jobApplicationId));
};

export const getAllCandidateAppliedJobsApi = async ( page: number, limit: number): Promise<IResponse> => {
   return await makeApiCall("get", jobApiUrlConfig.getAllCandidateAppliedJobsUrl(page, limit));
};


export const changeJobApplicationStatusApi = async (jobApplicationId: string, jobApplicationStatus: any): Promise<IResponse> => {
    return await makeApiCall("post", jobApiUrlConfig.changeJobApplicationStatusUrl(jobApplicationId), jobApplicationStatus);
};

export const getRecruiterDashboadGraphApi = async (): Promise<IResponse>=>{
    return  await makeApiCall("get", jobApiUrlConfig.getRecruiterDashboadGraphUrl())
}

export const getRecruiterDashboardCardsApi = async (): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getRecruiterDashboardCardsUrl());
};


// Recruiter
export const getAllRecruiterAddedJobsApi = async ( page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAllRecruiterAddedJobsUrl(page, limit));
};


export const createJobApi = async (data: IJob): Promise<IResponse> => {
    return await makeApiCall("post", jobApiUrlConfig.createJobUrl, data);
};

export const getAJobRecruiterApi = async (id: string): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAJobRecruiterUrl(id));
};

export const updateJobApi = async (jobId: string,data: Partial<IJob>): Promise<IResponse> => {
    return await makeApiCall("patch", jobApiUrlConfig.updateJobUrl(jobId), data);
};

export const changeJobCloseStatusApi = async (jobId: string): Promise<IResponse> => {
    return await makeApiCall("patch", jobApiUrlConfig.changeJobCloseStatusUrl(jobId));
};


export const deleteAJobApi = async (id: string): Promise<IResponse> => {
    return await makeApiCall("delete", jobApiUrlConfig.deleteAJobUrl(id));
};
