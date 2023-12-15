import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import {
	initialSignupValues,
	signUpSchema,
} from "../common-form-validation/signup";
import { recruiterSignupApi } from "../../../src/api/axios/auth/recruiterAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function RecruiterSignupForm() {
	const navigate = useNavigate()
	const notify = (msg: any, type: string) => {
		type === "error"
			? toast.error(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  })
			: toast.success(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  });
	};

	const handleSubmit = async (userData: any) => {
		try {
			const data = await recruiterSignupApi(userData);

			console.log("Hello",data);
			Swal.fire({
				text: data.data.message,
				confirmButtonText: "ok",
			}).then((response)=>{
				console.log(response);
				
				if(response){
					navigate(`/recruiter/otpSignupRecruiter/${userData.email}`)
				}
			})
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
		}
	};

	return (
		<Formik
			initialValues={initialSignupValues}
			validationSchema={signUpSchema}
			onSubmit={(values) => {
				console.log(values,"formik");
				handleSubmit(values);
			}}
		>
			{(formik) => {
				const { errors, touched } = formik;
				return (
					<div className="w-1/2 h-full flex flex-col p-14 justify-between items-center">
						<h1 className="text-xl font-semibold">
							Recruiter Sign Up
						</h1>

						<div className="w-full flex flex-col max-w-[450px]">
							<div className="w-full flex flex-col mb-10 ">
								<h3 className="text-3xl font-semibold mb-4">
									Sign Up
								</h3>
								<p className="text-base mb-4">
									welcome back! please enter your details
								</p>
							</div>
							<Form noValidate>
								<div className="w-full flex flex-col">
									<Field
										type="text"
										name="name"
										placeholder="Name"
										className={`w-full py-2 mt-2 text-black bg-transparent border-b border-black outline-none focus:outline-none ${
											errors.name && touched.name
												? "input-error border-red-500"
												: null
										}`}
									/>
									<label className="label mb-3">
										<span className="label-text-alt text-red-500">
											<ErrorMessage
												name="name"
												className="error label-text-alt"
											/>
										</span>
									</label>

									<Field
										type="email"
										name="email"
										placeholder="Email"
										className={`w-full py-2 mt-2 text-black bg-transparent border-b border-black outline-none focus:outline-none ${
											errors.email && touched.email
												? "input-error border-red-500"
												: null
										}`}
									/>
									<label className="label mt-1">
										<span className="label-text-alt text-red-500">
											<ErrorMessage
												name="email"
												className="error label-text-alt"
											/>
										</span>
									</label>

									<Field
										type="text"
										name="phone"
										placeholder="Phone"
										className={`w-full py-2 mt-2 text-black bg-transparent border-b border-black outline-none focus:outline-none ${
											errors.phone && touched.phone
												? "input-error border-red-500"
												: null
										}`}
									/>
									<label className="label mb-3">
										<span className="label-text-alt text-red-500">
											<ErrorMessage
												name="phone"
												className="error label-text-alt"
											/>
										</span>
									</label>

									<Field
										type="password"
										name="password"
										placeholder="Password"
										className={`w-full py-2 mt-2 text-black bg-transparent border-b border-black outline-none focus:outline-none ${
											errors.password && touched.password
												? "input-error border-red-500"
												: null
										}`}
									/>
									<label className="label">
										<span className="label-text-alt text-red-500">
											<ErrorMessage
												name="password"
												className="error label-text-alt"
											/>
										</span>
									</label>
								</div>
								<div className="w-full flex flex-col my-4">
									<button
										type="submit"
										className="w-full text-white bg-black rounded-md p-4 my-2 text-center flex items-center justify-center"
									>
										Sign Up
									</button>
								</div>
								<div className="w-full items-center justify-center flex">
									<p className="text-sm font-normal">
										Already have an account?
										<Link
											to="/recruiter/signin"
											className="font-semibold underline underline-offset-2 cursor-pointer"
										>
											Sign in
										</Link>
									</p>
								</div>
							</Form>
						</div>
					</div>
				);
			}}
		</Formik>
	);
}

export default RecruiterSignupForm;
