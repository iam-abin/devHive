import * as Yup from "yup";
import { IJob } from "../../types/Job";

// Initial job values
export const initialJobValues: IJob = {
    title: "",
    recruiterId: "",
    companyName: "",
    companyLocation: "",
    jobDescription: "",
    skills: [],  // Should be an empty array, not null
    availablePosition: 0,
    experienceRequired: 0,
    educationRequired: "",
    employmentType: "full-time",
    salaryMin: 0,
    salaryMax: 0,
    deadline: "",
};

// Job Schema Validation
export const jobSchema = Yup.object().shape({
    title: Yup.string()
        .matches(/^[^\s].*$/, "Title cannot start with a space")
        .min(3)
        .required("Title is required"),
    recruiterId: Yup.string().required("Recruiter ID is required"),
    companyName: Yup.string().min(1, "Company name must be at least 1 character").required("Company name is required"),
    companyLocation: Yup.string().min(1, "Company location must be at least 1 character").required("Company location is required"),

    // Optional fields
    jobDescription: Yup.string(),
    
    // Fix the issue with skills: Ensure it's only `string[]` or `undefined`, no `null`
    skills: Yup.array().of(Yup.string()).defined(),  // .defined() ensures it's either `string[]` or `undefined` but not `null`
    
    availablePosition: Yup.number()
        .min(1, "Available positions must be at least 1")
        .notRequired(),

    experienceRequired: Yup.number().notRequired(),
    educationRequired: Yup.string().notRequired(),
    employmentType: Yup.string().notRequired(),
    salaryMin: Yup.number().notRequired(),
    salaryMax: Yup.number().notRequired(),
    deadline: Yup.date().notRequired(),
});

// Define the JobFormSchemaType as the shape of the jobSchema
export type JobFormSchemaType = typeof jobSchema;
