
import jobApiUrlConfig from "../../../config/apiUrlsConfig/jobApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";


export const getAllJobsApi = async (page: number): Promise<any> => {
    const response: any = await candidateApiCalls("get", jobApiUrlConfig.getAllJobsUrl(page));
    return response.data;
};

export const filterJobsApi = async (filterData: any): Promise<any> => {
    const response: any = await candidateApiCalls("post", jobApiUrlConfig.filterJobsUrl, filterData);
    return response.data;
};



export const getAllRecruiterAddedJobsApi = async (recruiterId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAllRecruiterAddedJobsUrl(recruiterId));
    return response.data;
};

export const getJobFieldsValuesApi = async (fields: any): Promise<any> => {
    const response: any = await recruiterApiCalls("post", jobApiUrlConfig.getJobFieldsDistinctValuesUrl, fields);
    return response.data;
};


export const getAJobApi = async (id: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAJobUrl(id));
    return response.data;
};

export const createJobApi = async (data: any): Promise<any> => {
    const response: any = await recruiterApiCalls("post", jobApiUrlConfig.createJobUrl, data);
    return response.data;
};

export const updateJobApi = async (data: any): Promise<any> => {
    const response: any = await recruiterApiCalls("put", jobApiUrlConfig.updateJobUrl, data);
    return response.data;
};

export const changeJobCloseStatusApi = async (jobId: any): Promise<any> => {
    const response: any = await recruiterApiCalls("patch", jobApiUrlConfig.changeJobCloseStatusUrl(jobId));
    return response.data;
};


export const deleteAJobApi = async (id: string): Promise<any> => {
    const response: any = await recruiterApiCalls("delete", jobApiUrlConfig.deleteAJobUrl(id));
    return response.data;
};

export const candidateApplyJobApi = async (jobId: string): Promise<any> => {
    const response: any = await candidateApiCalls("post", jobApiUrlConfig.candidateApplyJobUrl(jobId));
    return response.data;

};

export const getAllJobsApplicationsForRecruiterApi = async (recruiterId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAllJobsApplicationsForRecruiterUrl(recruiterId));
    return response.data;
};



export const getAJobApplicationApi = async (jobApplicationId: string): Promise<any> => {
    const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAJobApplicationUrl(jobApplicationId));
    return response.data;
};

export const getAnAppliedJobApi = async (jobApplicationId: string): Promise<any> => {
    const response: any = await candidateApiCalls("get", jobApiUrlConfig.getAnAppliedJobUrl(jobApplicationId));
    return response.data;
};

export const getAllCandidateAppliedJobsApi = async (candidateId: string, currentPage: number): Promise<any> => {
    const response: any = await candidateApiCalls("get", jobApiUrlConfig.getAllCandidateAppliedJobsUrl(candidateId, currentPage));
    return response.data;
};

export const changeJobApplicationStatusApi = async (jobApplicationId: string, jobApplicationStatus: any): Promise<any> => {
    const response: any = await recruiterApiCalls("post", jobApiUrlConfig.changeJobApplicationStatusUrl(jobApplicationId), jobApplicationStatus);
 
    return response.data;
};

export const getRecruiterDashboadGraphApi = async (recruiterId: string)=>{
    const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getRecruiterDashboadGraphUrl(recruiterId))
    return response.data
}

export const getRecruiterDashboardCardsApi = async (recruiterId: string): Promise<any> => {        
    const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getRecruiterDashboardCardsUrl(recruiterId));

    return response.data;
};
