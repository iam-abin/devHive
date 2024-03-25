import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useLocation } from "react-router-dom";

interface EmailOrMobileProps {
	handleSubmit: any; // Adjust the type as needed
	initialValues: any;
	validationSchema: any;
}

const EmailOrMobile: React.FC<EmailOrMobileProps> = ({
	handleSubmit,
	initialValues,
	validationSchema,
}) => {
	const locationUrl = useLocation();

	console.log(location);
	// Check if the path contains the word "otpEmail"
	const isEmailEnterPage = locationUrl.pathname.includes(
		"forgotPasswordEmail"
	);
	// const isMobileEnterPage = locationUrl.pathname.includes("forgotPasswordEmail");

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				if (!values) {
					console.error("Form values are undefined.");
					return;
				}

				console.log("Email submitted values:", values);
				handleSubmit(values);
			}}
		>
			{(formik) => {
				const { errors, touched } = formik;

				return (
					<div className="flex items-center justify-center h-screen ">
						<div className="md:w-6/12  sm:w-9/12  p-5 rounded-3xl shadow-2xl bg-stone-300 shadow-black ">
							<div className="w-full mb-10">
								<h1 className="text-center sm:text-4xl md:text-5xl font-bold ">
									{isEmailEnterPage
										? "Enter Email"
										: "Enter Mobile number"}
								</h1>
								<div className="w-16 h-1 bg-black mx-auto my-4"></div>
							</div>

							{isEmailEnterPage ? (
								<Form noValidate>
									<div className="form-control w-6/6">
										<Field
											type="text"
											id="email"
											name="email"
											placeholder="Enter Email"
											className={`input input-primary w-full rounded-xl ${
												touched.email && errors.email
													? "border-red-500" // Apply red border if touched and has an error
													: ""
											}`}
										/>
									</div>
									<label className="label mb-3">
										<span className="label-text-alt text-red-500">
											<ErrorMessage
												name="email"
												className="error label-text-alt"
											/>
										</span>
									</label>

									<div className="flex items-center justify-center mb-3">
										<button
											type="submit"
											className={`btn btn-outline w-60 btn-primary`}
										>
											Submit Email
										</button>
									</div>
								</Form>
							) : (
								<Form noValidate>
									<div className="form-control w-6/6">
										<Field
											type="tel" // Use type "tel" for mobile numbers
											id="mobile"
											name="mobile"
											placeholder="Enter Mobile Number"
											className={`input input-primary w-full rounded-xl ${
												touched.mobile && errors.mobile
													? "border-red-500" // Apply red border if touched and has an error
													: ""
											}`}
										/>
									</div>
									<label className="label mb-3">
										<span className="label-text-alt text-red-500">
											<ErrorMessage
												name="mobile"
												className="error label-text-alt"
											/>
										</span>
									</label>

									<div className="flex items-center justify-center mb-3">
										<button
											type="submit"
											className={`btn btn-outline w-60 from-neutral-300 to-stone-400`}
										>
											Submit Mobile Number
										</button>
									</div>
								</Form>
							)}
						</div>
					</div>
				);
			}}
		</Formik>
	);
};

export default EmailOrMobile;
