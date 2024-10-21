import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import recruiterLoginImage from "../../../assets/auth/recruiter-login.svg"

import {
	initialSigninValues,
	signInSchema,
} from "../../../utils/validations/signin-validation";
import { notify } from "../../../utils/toastMessage";
import { recruiterSigninApi } from "../../../axios/apiMethods/auth-service/recruiterAuth";
import { RootState } from "../../../redux/reducer";
import Loading from "../../../components/loading/Loading";
import { RiArrowLeftFill } from "react-icons/ri";
import { setUser } from "../../../redux/slice/user";

function RecruiterSigninPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const handleSubmit = async (userData: any) => {
		try {
			// dispatch(setLoading());
			const response = await recruiterSigninApi(userData);
			dispatch(
				setUser({
					data: response.data,
					accessToken: response.accessToken!,
					refreshToken: response.refreshToken!,
				})
			);
			notify(response.message, "success");
			navigate("/recruiter");
		}finally {
			// dispatch(setLoaded());
		}
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<main className="w-full h-screen flex items-center  ">
			{/* left */}
			<div className="hidden lg:flex relative flex-col w-1/2 h-full  ">
				<button onClick={()=>navigate('/recruiter')} className="bg-slate-700 rounded-xl p-2 text-white w-20 flex justify-between items-center absolute m-10"><RiArrowLeftFill />home</button>
				<img
					src={recruiterLoginImage}
					className="w-full h-full object-cover"
					alt=""
				/>
			</div>

			{/* right */}
			<Formik
				initialValues={initialSigninValues}
				validationSchema={signInSchema}
				onSubmit={(values) => {
					handleSubmit(values);
				}}
			>
				{(formik) => {
					const { errors, touched } = formik;
					return (
						<div className="md:w-1/2 h-full flex flex-col p-14 justify-between items-center">
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
											autoComplete="email"
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
											autoComplete="current-password" 
											className={`w-full py-2 mt-2 text-black bg-transparent border-b border-black outline-none focus:outline-none ${
												errors.password &&
												touched.password
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
												<p
													onClick={() =>
														navigate(
															"/recruiter/forgotPasswordEmail"
														)
													}
													className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"
												>
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
		</main>
	);
}

export default RecruiterSigninPage;
