
import jobApiUrlConfig from "../../../config/apiUrlsConfig/jobApiUrlConfig";
import { IResponse } from "../../../types/api";
import makeApiCall from "../../apiCalls";


export const getAllJobsApi = async (page: number): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAllJobsUrl(page));
};

export const filterJobsApi = async (filterData: any): Promise<IResponse> => {
    return await makeApiCall("post", jobApiUrlConfig.filterJobsUrl, filterData);
};



export const getAllRecruiterAddedJobsApi = async ( page: number, limit: number): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAllRecruiterAddedJobsUrl(page, limit));
};

export const getJobFieldsValuesApi = async (fields: any): Promise<IResponse> => {
    return await makeApiCall("post", jobApiUrlConfig.getJobFieldsDistinctValuesUrl, fields);
};


export const getAJobApi = async (id: string): Promise<IResponse> => {
    return await makeApiCall("get", jobApiUrlConfig.getAJobUrl(id));
};

export const createJobApi = async (data: any): Promise<IResponse> => {
    return await makeApiCall("post", jobApiUrlConfig.createJobUrl, data);
};

export const updateJobApi = async (data: any): Promise<IResponse> => {
    return await makeApiCall("put", jobApiUrlConfig.updateJobUrl, data);
};

export const changeJobCloseStatusApi = async (jobId: string): Promise<IResponse> => {
    return await makeApiCall("patch", jobApiUrlConfig.changeJobCloseStatusUrl(jobId));
};


export const deleteAJobApi = async (id: string): Promise<IResponse> => {
    return await makeApiCall("delete", jobApiUrlConfig.deleteAJobUrl(id));
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

export const getAllCandidateAppliedJobsApi = async (candidateId: string, currentPage: number): Promise<IResponse> => {
   return await makeApiCall("get", jobApiUrlConfig.getAllCandidateAppliedJobsUrl(candidateId, currentPage));
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

export const editJobApi = async (jobId: string, jobData: any): Promise<IResponse> => {
    return await makeApiCall("patch", jobApiUrlConfig.editJobUrl(jobId), jobData);
};
