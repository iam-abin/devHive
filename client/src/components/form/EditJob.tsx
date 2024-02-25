import { useEffect, useState } from "react";
// import { getAJobApi, updateJobApi } from "../../axios/admin2/jobs/jobs";
import {
	getAJobApi,
	updateJobApi,
} from "../../axios/apiMethods/jobs-service/jobs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../utils/toastMessage";
interface JobFormData {
	jobId: string;
	title: string;
	recruiter: string;
	// company: string;
	company_name: string;
	company_location: string;
	job_descriptions: string;
	skills_required: string[];
	available_position: number;
	experience_required: string;
	education_required: string;
	// location: string;
	employment_type: string;
	salary_min: number;
	salary_max: number;
	deadline: string;
}

function EditJob() {
	// const [updatedJobDetails, setupdatedJobDetails] = useState("");
	const [jobDetails, setJobDetails] = useState<any>(null);
	const navigate = useNavigate();
	const { jobId } = useParams();
	// const jobId = useSelector((state: RootState) => {
	// 	return state.recruiterJobId.jobId;
	// });

	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				if (jobId) {
					const job = await getAJobApi(jobId);
					setJobDetails(job.data);
				}
			} catch (error) {
				// Handle error, e.g., log it or show an error message to the user
				console.error("Error fetching job details:", error);
			}
		};

		fetchJobDetails();
	}, [jobId]);
	if (!jobDetails) {
		return <div>Loading...</div>;
	}

	console.log(jobDetails, "in edit job details component");

	const handleSubmit = async (jobData: JobFormData) => {
		try {
			console.log("jobData ", jobData);
			console.log("jobDetails.jobId ", jobDetails.jobId);

			const data = await updateJobApi(jobData);

			console.log("Hello");
			if (data.data) {
				notify("updated successfully", "success");
				navigate("/recruiter/all-jobs");
			} else {
				notify("not updated", "error");
			}
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
		}
	};

	const initialJobValues: JobFormData = {
		jobId: "",
		title: jobDetails?.title ?? "",
		recruiter: jobDetails?.recruiter ?? "",
		// company: jobDetails?.company ?? "",
		job_descriptions: jobDetails?.job_descriptions ?? "",
		skills_required: jobDetails?.skills_required ?? [],
		available_position: jobDetails?.available_position ?? 0,
		experience_required: jobDetails?.experience_required ?? "",
		education_required: jobDetails?.education_required ?? "",
		// location: jobDetails?.location ?? "",
		company_name: jobDetails?.company_name ?? "",
		company_location: jobDetails?.company_location ?? "",
		employment_type: jobDetails?.employment_type,
		salary_min: jobDetails?.salary_min ?? 0,
		salary_max: jobDetails?.salary_max ?? 0,
		deadline:
			new Date(jobDetails?.deadline).toLocaleDateString("en-CA") ?? "",
	};

	//   const jobCreationSchema: /* Define your validation schema here */ = /* ... */;
	const today = new Date().toISOString().split("T")[0];

	return (
		<Formik
			initialValues={initialJobValues}
			// validationSchema={jobCreationSchema}
			onSubmit={(values) => {
				console.log("on submit edit job formik", values);
				values.jobId = jobDetails.id;
				handleSubmit(values);
			}}
		>
			{(formik) => {
				const { errors, touched } = formik;
				return (
					<div className="w-6/12 p-6">
						<div className="mb-16">
							<h1 className="text-center text-5xl font-bold">
								Edit Job
							</h1>
							<div className="w-16 h-1 bg-black mx-auto my-4"></div>
						</div>

						<Form noValidate className="bg-slate-300 p-6">
							{/* Job title field */}
							<div className="form-control w-6/6">
								<label htmlFor="title" className="label">
									Job Title
								</label>
								<Field
									type="text"
									id="title"
									name="title"
									className={`input input-primary w-full rounded-xl ${
										errors.title && touched.title
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="title"
									component="div"
									className="error label-text-alt"
								/>
							</div>

							{/* Recruiter field
							<div className="form-control w-6/6">
								<label htmlFor="recruiter" className="label">
									Recruiter
								</label>
								<Field
									type="text"
									id="recruiter"
									name="recruiter"
									className={`input input-primary w-full rounded-xl ${
										errors.recruiter && touched.recruiter
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="recruiter"
									component="div"
									className="error label-text-alt"
								/>
							</div> */}

							{/* Company field
							<div className="form-control w-6/6">
								<label htmlFor="company" className="label">
									Company
								</label>
								<Field
									type="text"
									id="company"
									name="company"
									className={`input input-primary w-full rounded-xl ${
										errors.company && touched.company
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="company"
									component="div"
									className="error label-text-alt"
								/>
							</div> */}

							{/* Job Descriptions field */}
							<div className="form-control w-6/6">
								<label
									htmlFor="job_descriptions"
									className="label"
								>
									Job Descriptions
								</label>
								<Field
									as="textarea"
									id="job_descriptions"
									name="job_descriptions"
									className={`input input-primary w-full rounded-xl ${
										errors.job_descriptions &&
										touched.job_descriptions
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="job_descriptions"
									component="div"
									className="error label-text-alt"
								/>
							</div>

							{/* Skills Required field */}
							<div className="form-control w-6/6">
								<label
									htmlFor="skills_required"
									className="label"
								>
									Skills Required (comma-separated)
								</label>
								<Field
									type="text"
									id="skills_required"
									name="skills_required"
									className={`input input-primary w-full rounded-xl ${
										errors.skills_required &&
										touched.skills_required
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="skills_required"
									component="div"
									className="error label-text-alt"
								/>
							</div>

							{/* Education Required field */}
							<div className="form-control w-6/6">
								<label
									htmlFor="education_required"
									className="label"
								>
									Education Required
								</label>
								<Field
									type="text"
									id="education_required"
									name="education_required"
									className={`input input-primary w-full rounded-xl ${
										errors.education_required &&
										touched.education_required
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="education_required"
									component="div"
									className="error label-text-alt"
								/>
							</div>

							{/* Location field */}
							{/* <div className="form-control w-6/6">
								<label htmlFor="location" className="label">
									Location
								</label>
								<Field
									type="text"
									id="location"
									name="location"
									className={`input input-primary w-full rounded-xl ${
										errors.location && touched.location
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="location"
									component="div"
									className="error label-text-alt"
								/>
							</div> */}

							<div className="flex justify-between">
								{/* Experience Required field */}
								<div className="form-control w-6/6">
									<label
										htmlFor="experience_required"
										className="label"
									>
										Experience Required
									</label>
									<Field
										type="text"
										id="experience_required"
										name="experience_required"
										className={`input input-primary w-full rounded-xl ${
											errors.experience_required &&
											touched.experience_required
												? "input-error"
												: ""
										}`}
									/>
									<ErrorMessage
										name="experience_required"
										component="div"
										className="error label-text-alt"
									/>
								</div>

								{/* Employment Type field */}
								<div className="form-control w-5/12">
									<label
										htmlFor="employment_type"
										className="label"
									>
										Employment Type
									</label>

									<Field
										as="select" // Use the 'as' prop to render a select element
										id="employment_type"
										name="employment_type"
										className={`select select-primary w-full max-w-xs ${
											errors.employment_type &&
											touched.employment_type
												? "input-error"
												: ""
										}`}
									>
										<option value="full-time">
											Full-time
										</option>
										<option value="part-time">
											Part-time
										</option>
									</Field>
									<ErrorMessage
										name="employment_type"
										component="div"
										className="error label-text-alt"
									/>
								</div>
							</div>

							<div className="flex justify-between">
								{/* Salary Min field */}
								<div className="form-control w-5/12">
									<label
										htmlFor="salary_min"
										className="label"
									>
										Salary Min
									</label>
									<Field
										type="number"
										id="salary_min"
										name="salary_min"
										className={`input input-primary w-full rounded-xl ${
											errors.salary_min &&
											touched.salary_min
												? "input-error"
												: ""
										}`}
									/>
									<ErrorMessage
										name="salary_min"
										component="div"
										className="error label-text-alt"
									/>
								</div>

								{/* Salary Max field */}
								<div className="form-control w-5/12">
									<label
										htmlFor="salary_max"
										className="label"
									>
										Salary Max
									</label>
									<Field
										type="number"
										id="salary_max"
										name="salary_max"
										className={`input input-primary w-full rounded-xl ${
											errors.salary_max &&
											touched.salary_max
												? "input-error"
												: ""
										}`}
									/>
									<ErrorMessage
										name="salary_max"
										component="div"
										className="error label-text-alt"
									/>
								</div>
							</div>

							<div className="flex justify-between">
								{/* Available Positions field */}
								<div className="form-control w-6/6">
									<label
										htmlFor="available_position"
										className="label"
									>
										Available Positions
									</label>
									<Field
										type="number"
										id="available_position"
										name="available_position"
										className={`input input-primary w-full rounded-xl ${
											errors.available_position &&
											touched.available_position
												? "input-error"
												: ""
										}`}
									/>
									<span className="label-text-alt text-red-500">
										<ErrorMessage
											name="available_position"
											component="div"
											className="error label-text-alt"
										/>
									</span>
								</div>

								{/* Deadline field */}
								<div className="form-control w-5/12">
									<label htmlFor="deadline" className="label">
										Deadline
									</label>
									<Field
										type="date"
										min={today}
										id="deadline"
										name="deadline"
										className={`input input-primary w-full rounded-xl ${
											errors.deadline && touched.deadline
												? "input-error"
												: ""
										}`}
									/>
									<ErrorMessage
										name="deadline"
										component="div"
										className="error label-text-alt"
									/>
								</div>
							</div>

							<div className="flex items-center justify-center mt-3 mb-3">
								<button
									type="submit"
									className="btn w-60 btn-primary"
								>
									Update Job
								</button>
							</div>
						</Form>
					</div>
				);
			}}
		</Formik>
	);
}

export default EditJob;
