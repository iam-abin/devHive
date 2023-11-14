import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";

import {
	initialSigninValues,
	signInSchema,
} from "../common-form-validation/signin";
import { recruiterSigninApi } from "../../../src/api/axios/auth/recruiterAuth";
import { recruiterSignin } from "../../redux/slice/recruiterSlice/recruiterAuthSlice";
import { setRecruiter } from "../../redux/slice/recruiterSlice/recruiterDataSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../redux/reducer/reducer";
import { useEffect } from "react";

function RecruiterSigninForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state: RootState)=>{
		return state.recruiterAuth.recruiterLoggedIn;
	})

	useEffect(()=>{
		console.log("recruiter is logged in",isLoggedIn);
		
		if(isLoggedIn){
			navigate("/")
		}

	},[])

	console.log("hi recruiter signin");

	const notify = (msg: any, type: string) => {
		type === "error"
			? toast.error(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  })
			: toast.success(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  });
	};

	// // const isLoggedIn =
	const handleSubmit = async (userData: any) => {
		try {
			const { data, message } = await recruiterSigninApi(userData);
			// console.log("hiiii", response);
			dispatch(recruiterSignin());
			dispatch(setRecruiter(data));
			notify(message, "success");
			navigate("/");
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
		}
	};

	return (
		<Formik
			initialValues={initialSigninValues}
			validationSchema={signInSchema}
			onSubmit={(values) => {
				console.log(values);
				handleSubmit(values);
			}}
		>
			{(formik) => {
				const { errors, touched } = formik;
				return (
					<div className="w-1/2 h-full flex flex-col p-14 justify-between items-center">
						<ToastContainer />
						<h1 className="text-xl font-semibold">
							Recruiter Sign In
						</h1>

						<div className="w-full flex flex-col max-w-[450px]">
							<div className="w-full flex flex-col mb-10 ">
								<h3 className="text-3xl font-semibold mb-4">
									Signin
								</h3>
								<p className="text-base mb-4">
									welcome back! please enter your details
								</p>
							</div>
							<Form noValidate>
								<div className="w-full flex flex-col">
									<Field
										type="email"
										placeholder="Email"
										name="email"
										className={`w-full py-2 mt-2 text-black bg-transparent border-b border-black outline-none focus:outline-none ${
											errors.email && touched.email
												? "input-error border-red-500"
												: null
										}`}
									/>
									<label className="label mb-3">
										<span className="label-text-alt text-red-500">
											<ErrorMessage
												name="email"
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
												? "input-error  border-red-500"
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
										<div className="flex justify-end">
											<p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
												Forgot password?
											</p>
										</div>
									</label>

									<div className="w-full flex flex-col my-4">
										<button
											type="submit"
											className="w-full text-white bg-black rounded-md p-4 my-2 text-center flex items-center justify-center"
										>
											Sign In
										</button>
									</div>
								</div>
							</Form>
						</div>

						<div className="w-full items-center justify-center flex">
							<p className="text-sm font-normal">
								Don't have an account?
								<Link
									to="/recruiter/signup"
									className="font-semibold underline underline-offset-2 cursor-pointer"
								>
									Sign up
								</Link>
							</p>
						</div>
					</div>
				);
			}}
		</Formik>
	);
}

export default RecruiterSigninForm;
