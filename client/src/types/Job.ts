import { JobFormSchemaType } from "../utils/validations/createJob";
import {  IRecruiterProfileResponse } from "./profile";

interface IJobOptionalProperties {
    id: string;
    jobDescription: string;
    skills: string[];
    availablePosition: number;
    experienceRequired: number;
    educationRequired: string;
    employmentType: string;
    salaryMin: number;
    salaryMax: number;
    deadline: string;
    isActive: boolean
}


export interface IJob extends Partial<IJobOptionalProperties> {
    title: string;
    recruiterId: string ;
    companyName: string;
    companyLocation: string;
}

export interface IJobResponse extends IJob {
	id: string
}

export interface IEditJobProps {
    initialJobValues: Partial<IJob>;
	handleSubmit: (values: Partial<IJob>) => void;
}



export interface IJobProps {
	initialJobValues: IJob;
    handleSubmit: (values: IJob) => void;
	recruiterData: IRecruiterProfileResponse
	jobSchema :JobFormSchemaType
}


export interface IJobApplication {
    jobId: string;
    candidateId: string;
    recruiterId: string;
    applicationStatus: string;
}


export interface IFilter {
    title: string;
    companyLocation: string;
    employmentType: string;
}

export interface ISearch {
    searchKey: string;
}