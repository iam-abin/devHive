
import jobApiUrlConfig from "../../../config/apiUrlsConfig/jobApiUrlConfig";
import candidateApiCalls from "../../candidate/apiCalls";
import recruiterApiCalls from "../../recruiter/apiCalls";





export const getAllJobsApi = async (page: number): Promise<any> => {
    // try {
		const response: any = await candidateApiCalls("get", jobApiUrlConfig.getAllJobsUrl(page));
		console.log("response is",response.data);
	
		return response.data;
	// } catch (error) {
	// 	console.log(error);
		
	// }

    // const response = await axios({
    //     method: "get",
    //     url: `${BASE_URL_CANDIDATE}`,
    // });
    // console.log(response);
    
    // console.log(response.data);
    // return response;
};

export const filterJobsApi = async (filterData: any): Promise<any> => {
		const response: any = await candidateApiCalls("post", jobApiUrlConfig.filterJobsUrl, filterData);
		console.log("response is",response.data);
	
		return response.data;
};



export const getAllRecruiterAddedJobsApi = async (recruiterId: string): Promise<any> => {
		const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAllRecruiterAddedJobsUrl(recruiterId));
		console.log("response is",response.data);
	
		return response.data;
};

export const getJobFieldsValuesApi = async (fields: any): Promise<any> => {
    console.log("in getJObFields api ----", fields);
    
    const response: any = await recruiterApiCalls("post", jobApiUrlConfig.getJobFieldsDistinctValuesUrl, fields);
    console.log("response is",response.data);

    return response.data;
};


export const getAJobApi = async (id: string): Promise<any> => {
        console.log("in getAJOb api", id);
        
		const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAJobUrl(id));
		console.log("response is",response.data);
	
		return response.data;
};




export const createJobApi = async (data: any): Promise<any> => {
		const response: any = await recruiterApiCalls("post", jobApiUrlConfig.createJobUrl, data);
		console.log("response is",response.data);
	
		return response.data;
	
};

export const updateJobApi = async (data: any): Promise<any> => {
    console.log("updateJobApi data ",data);
		const response: any = await recruiterApiCalls("patch", jobApiUrlConfig.updateJobUrl, data);
        console.log("response is",response);
		console.log("response data is",response.data);
	
		return response.data;
};

export const changeJobCloseStatusApi = async (jobId: any): Promise<any> => {
    console.log("changeJobCloseStatusApi jobId ",jobId);
		const response: any = await recruiterApiCalls("patch", jobApiUrlConfig.changeJobCloseStatusUrl(jobId));
        console.log("response is",response);
		console.log("response data is",response.data);
	
		return response.data;
};


export const deleteAJobApi = async (id: string): Promise<any> => {
    console.log("in deleteAJob Api ", id);
    
    const response: any = await recruiterApiCalls("delete", jobApiUrlConfig.deleteAJobUrl(id));
    console.log("response is",response.data);

    return response.data;
};

export const candidateApplyJobApi = async (data: any): Promise<any> => {
    console.log("in candidateApplyJob Api ", data);
    const response: any = await candidateApiCalls("post", jobApiUrlConfig.candidateApplyJobUrl, data);
    console.log("response is",response.data);

    return response.data;

};

export const getAllJobsApplicationsForRecruiterApi = async (recruiterId: string): Promise<any> => {
		const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAllJobsApplicationsForRecruiterUrl(recruiterId));
		console.log("response is",response.data);
	
		return response.data;
};



export const getAJobApplicationApi = async (jobApplicationId: string): Promise<any> => {
    console.log("in getAJobApplication api", jobApplicationId);
    
    const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAJobApplicationUrl(jobApplicationId));
    console.log("response is",response.data);

    return response.data;
};

export const getAnAppliedJobApi = async (jobApplicationId: string): Promise<any> => {
    console.log("in getAJobApplication api", jobApplicationId);
    
    const response: any = await candidateApiCalls("get", jobApiUrlConfig.getAnAppliedJobUrl(jobApplicationId));
    console.log("response is",response.data);

    return response.data;
};

export const getAllCandidateAppliedJobsApi = async (candidateId: string, currentPage: number): Promise<any> => {
    console.log("in getAllAppliedJobs api", candidateId);
    
    const response: any = await candidateApiCalls("get", jobApiUrlConfig.getAllCandidateAppliedJobsUrl(candidateId, currentPage));
    console.log("response is",response.data);

    return response.data;
};

export const changeJobApplicationStatusApi = async (jobApplicationId: string, jobApplicationStatus: any): Promise<any> => {
    console.log("in changeJobApplicationStatus api", jobApplicationId);
    
    const response: any = await recruiterApiCalls("post", jobApiUrlConfig.changeJobApplicationStatusUrl(jobApplicationId), jobApplicationStatus);
    console.log("response is",response.data);

    return response.data;
};

export const getRecruiterDashboadApi = async ()=>{
    console.log("in getAllRecruiterDashboardCardsDetailsApi 1 api");
    const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getRecruiterDashboardDetailsUrl)
    console.log("in getAllRecruiterDashboardCardsDetailsApi 2 api response ",response);

    return response.data
}

export const getAllRecruiterDashboardCardsDetailsApi = async (): Promise<any> => {
    console.log("in getAllRecruiterDashboardCardsDetailsApi api");
    
    const response: any = await recruiterApiCalls("get", jobApiUrlConfig.getAllRecruiterDashboardCardsDetailsUrl);
    console.log("in getAllRecruiterDashboardCardsDetailsApi api response ",response);
    
    console.log("response is",response.data);

    return response.data;
};
