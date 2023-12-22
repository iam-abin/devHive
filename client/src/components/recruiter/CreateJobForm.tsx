import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import { createJobApi } from "../../axios/api/jobs/jobs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/toastMessage";

interface JobFormData {
	title: string;
	recruiterId: string;
	companyId?: string;
	job_descriptions: string;
	skills_required: string[];
	available_position: number;
	experience_required: string;
	education_required: string;
	location: string;
	employment_type: string;
	salary_min: number;
	salary_max: number;
	deadline: string;
}

function CreateJobForm() {
	const recruiterData = useSelector(
		(state: RootState) => state.recruiterData.recruiter
	);

	const navigate = useNavigate();
	

	const handleSubmit = async (jobData: JobFormData) => {
		try {
			const response = await createJobApi(jobData);

			console.log("Hello");

			notify(response.data.message, "success");
			navigate("/recruiter/all-jobs");
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
		}
	};

	const initialJobValues: JobFormData = {
		title: "",
		recruiterId: "",
		// companyId: "",
		job_descriptions: "",
		skills_required: [],
		available_position: 0,
		experience_required: "",
		education_required: "",
		location: "",
		employment_type: "full-time",
		salary_min: 0,
		salary_max: 0,
		deadline: "",
	};

	//   const jobCreationSchema: /* Define your validation schema here */ = /* ... */;

	return (
		<Formik
			initialValues={initialJobValues}
			// validationSchema={jobCreationSchema}
			onSubmit={(values) => {
				values.recruiterId = recruiterData.id;
				console.log(values);
				handleSubmit(values);
			}}
		>
			{(formik) => {
				const { errors, touched } = formik;
				return (
					<div className="w-6/12 p-6">
						<div className="mb-16">
							<h1 className="text-center text-5xl font-bold">
								Create Job
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
							<div className="form-control w-6/6">
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
							</div>

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
									<ErrorMessage
										name="available_position"
										component="div"
										className="error label-text-alt"
									/>
								</div>

								{/* Deadline field */}
								<div className="form-control w-5/12">
									<label htmlFor="deadline" className="label">
										Deadline
									</label>
									<Field
										type="text"
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
									Create Job
								</button>
							</div>
						</Form>
					</div>
				);
			}}
		</Formik>
	);
}

export default CreateJobForm;
