import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { IJob, IJobProps } from "../../types/Job";

const CreateJobForm: React.FC< IJobProps > = ({ initialJobValues, handleSubmit, recruiterData, jobSchema }) => {
	const today = new Date().toISOString().split("T")[0];
	
	return (
		<Formik
			initialValues={initialJobValues}
			validationSchema={jobSchema}
			onSubmit={(values) => {
				if (recruiterData?.companyName) {
					values.companyName = recruiterData.companyName;
				}
				if (recruiterData?.companyLocation) {
					values.companyLocation = recruiterData.companyLocation;
				}
				
				values.recruiterId = recruiterData?.id!;
				handleSubmit(values);
			}}
		>
			{(formik: FormikProps<IJob>) => {
				const { errors, touched } = formik;
				return (
					<div className="md:w-6/12 p-6 h-full">
						<div className="mb-5">
							<h1 className="text-center text-2xl md:text-5xl font-bold">
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

							{/* Job Descriptions field */}
							<div className="form-control w-6/6">
								<label
									htmlFor="jobDescription"
									className="label"
								>
									Job Descriptions
								</label>
								<Field
									as="textarea"
									id="jobDescription"
									name="jobDescription"
									className={`input input-primary w-full rounded-xl ${
										errors.jobDescription &&
										touched.jobDescription
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="jobDescription"
									component="div"
									className="error label-text-alt"
								/>
							</div>

							{/* Skills Required field */}
							<div className="form-control w-6/6">
								<label
									htmlFor="skills"
									className="label"
								>
									Skills Required (comma-separated)
								</label>
								<Field
									type="text"
									id="skills"
									name="skills"
									className={`input input-primary w-full rounded-xl ${
										errors.skills &&
										touched.skills
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="skills"
									component="div"
									className="error label-text-alt"
								/>
							</div>

							{/* Education Required field */}
							<div className="form-control w-6/6">
								<label
									htmlFor="educationRequired"
									className="label"
								>
									Education Required
								</label>
								<Field
									type="text"
									id="educationRequired"
									name="educationRequired"
									className={`input input-primary w-full rounded-xl ${
										errors.educationRequired &&
										touched.educationRequired
											? "input-error"
											: ""
									}`}
								/>
								<ErrorMessage
									name="educationRequired"
									component="div"
									className="error label-text-alt"
								/>
							</div>
							
							<div className="flex justify-between">
								{/* Experience Required field */}
								<div className="form-control w-6/6">
									<label
										htmlFor="experienceRequired"
										className="label"
									>
										Experience Required
									</label>
									<Field
										type="text"
										id="experienceRequired"
										name="experienceRequired"
										className={`input input-primary w-full rounded-xl ${
											errors.experienceRequired &&
											touched.experienceRequired
												? "input-error"
												: ""
										}`}
									/>
									<ErrorMessage
										name="experienceRequired"
										component="div"
										className="error label-text-alt"
									/>
								</div>

								{/* Employment Type field */}
								<div className="form-control w-5/12">
									<label
										htmlFor="employmentType"
										className="label"
									>
										Employment Type
									</label>

									<Field
										as="select" // Use the 'as' prop to render a select element
										id="employmentType"
										name="employmentType"
										className={`select select-primary w-full max-w-xs ${
											errors.employmentType &&
											touched.employmentType
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
										name="employmentType"
										component="div"
										className="error label-text-alt"
									/>
								</div>
							</div>

							<div className="flex justify-between">
								{/* Salary Min field */}
								<div className="form-control w-5/12">
									<label
										htmlFor="salaryMin"
										className="label"
									>
										Salary Min
									</label>
									<Field
										type="number"
										id="salaryMin"
										name="salaryMin"
										className={`input input-primary w-full rounded-xl ${
											errors.salaryMin &&
											touched.salaryMin
												? "input-error"
												: ""
										}`}
									/>
									<ErrorMessage
										name="salaryMin"
										component="div"
										className="error label-text-alt"
									/>
								</div>

								{/* Salary Max field */}
								<div className="form-control w-5/12">
									<label
										htmlFor="salaryMax"
										className="label"
									>
										Salary Max
									</label>
									<Field
										type="number"
										id="salaryMax"
										name="salaryMax"
										className={`input input-primary w-full rounded-xl ${
											errors.salaryMax &&
											touched.salaryMax
												? "input-error"
												: ""
										}`}
									/>
									<ErrorMessage
										name="salaryMax"
										component="div"
										className="error label-text-alt"
									/>
								</div>
							</div>

							<div className="flex justify-between">
								{/* Available Positions field */}
								<div className="form-control w-6/6">
									<label
										htmlFor="availablePosition"
										className="label"
									>
										Available Positions
									</label>
									<Field
										type="number"
										id="availablePosition"
										name="availablePosition"
										className={`input input-primary w-full rounded-xl ${
											errors.availablePosition &&
											touched.availablePosition
												? "input-error"
												: ""
										}`}
									/>
									<ErrorMessage
										name="availablePosition"
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

									<span className="label-text-alt text-red-500">
										<ErrorMessage
											name="deadline"
											component="div"
											className="error label-text-alt "
										/>
									</span>
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
};

export default CreateJobForm;
