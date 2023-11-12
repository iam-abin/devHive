import { ErrorMessage, Field, Form, Formik } from "formik";
import { initialSigninValues, signInSchema } from "../common-form-validation/signin";

import googleIcon from "../../assets/google-icon.svg";



function CandidateSigninForm() {
	return (
		<Formik
			initialValues={initialSigninValues}
			validationSchema={signInSchema}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			{(formik) => {
				const { errors, touched } = formik;

				return (
					<div className="w-6/12 h-5/6">
						<div className="mb-16">
							<h1 className="text-center  text-5xl font-bold">
								Sign In
							</h1>
							<div className="w-16 h-1 bg-black mx-auto my-4"></div>
						</div>

						<Form noValidate>
							<div className="form-control w-6/6">
								<Field
									type="email"
									name="email"
									placeholder="Email"
									className={`input input-primary w-full rounded-xl ${
										errors.email && touched.email
											? "input-error"
											: null
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

							<div className="form-control w-6/6">
								<Field
									type="password"
									name="password"
									placeholder="Password"
									className={`input input-primary w-full rounded-xl ${
										errors.password && touched.password
											? "input-error"
											: null
									}`}
								/>
							</div>
							<div className="flex items-center justify-between mb-5">
								<label className="label">
									<span className="label-text-alt text-red-500">
										<ErrorMessage
											name="password"
											className="error label-text-alt"
										/>
									</span>
								</label>
								<label className="label mt-1">
									<span className="label-text-alt cursor-pointer">
										Forgot Password?
									</span>
								</label>
							</div>

							<div className="flex items-center justify-center mb-3">
								<button
									type="submit"
									className={`btn btn-outline w-60 btn-primary`}
								>
									Signin
								</button>
							</div>

							<div className="flex items-center">
								<div className="flex-1 h-0 border-t border-black"></div>
								<div className="mx-4 text-black">or</div>
								<div className="flex-1 h-0 border-t border-black"></div>
							</div>

						</Form>
							<div className="flex items-center justify-center gap-3">
								<button className="btn border-gray-600 w-60">
									<img
										src={googleIcon}
										className="w-7"
										alt=""
									/>
									Sign in With Google
								</button>
							</div>
					</div>
				);
			}}
		</Formik>
	);
}

export default CandidateSigninForm;