import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";

import {
	initialSignupValues,
	signUpSchema,
} from "../../../utils/signup-validation";
import { notify } from "../../../utils/toastMessage";
import { candidateSignupApi } from "../../../axios/apiMethods/auth-service/candidateAuth";


import candidateLoginImage from "../../../assets/candidate/candidate-login.svg"
import googleIcon from "../../../assets/google/google-icon.svg"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";
import {
	setLoaded,
	setLoading,
} from "../../../redux/slice/loaderSlice/isLoading";
import Loading from "../../../components/loading/Loading";
import { RiArrowLeftFill } from "react-icons/ri";

function CandidateSignupPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);
	const handleSubmit = async (userData: any) => {
		try {
			dispatch(setLoading());
			const response = await candidateSignupApi(userData);
			Swal.fire({
				text: response?.message || "Email sendedddd",
				confirmButtonText: "ok",
			}).then((res) => {
				if (res) {
					navigate(`/candidate/otpSignupCandidate/${userData.email}`);
				}
			});
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
		} finally {
			dispatch(setLoaded());
		}
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className="flex w-full h-screen">
			<button onClick={()=>navigate('/candidate')} className="bg-slate-700 rounded-xl p-2 text-white w-20 flex justify-between items-center absolute m-10"><RiArrowLeftFill />home</button>

			<div className="w-full lg:w-7/12 flex items-center justify-center">
				<Formik
					initialValues={initialSignupValues}
					validationSchema={signUpSchema}
					onSubmit={(values) => {
						handleSubmit(values);
					}}
				>
					{(formik) => {
						const { errors, touched } = formik;
						return (
							<div className="w-6/12 h-5/6">
								<div className="mb-16">
									<h1 className="text-center  text-5xl font-bold">
										Sign Up
									</h1>
									<div className="w-16 h-1 bg-black mx-auto my-4"></div>
								</div>

								<Form noValidate>
									<div className="form-control w-6/6">
										<Field
											type="text"
											name="name"
											placeholder="Name"
											className={`input input-primary w-full rounded-xl ${
												errors.name && touched.name
													? "input-error"
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
									</div>

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
									<label className="label mt-1">
										<span className="label-text-alt text-red-500">
											<ErrorMessage
												name="email"
												className="error label-text-alt"
											/>
										</span>
									</label>

									<div className="form-control w-6/6">
										<Field
											type="text"
											name="phone"
											placeholder="Phone"
											className={`input input-primary w-full rounded-xl ${
												errors.phone && touched.phone
													? "input-error border-red-500"
													: null
											}`}
										/>
									</div>
									<label className="label mb-3">
										<span className="label-text-alt text-red-500">
											<ErrorMessage
												name="phone"
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
												errors.password &&
												touched.password
													? "input-error border-red-500"
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
												<Link
													to="/candidate/signin"
													className="cursor-pointer"
												>
													Already have an account?
												</Link>
											</span>
										</label>
									</div>

									<div className="flex items-center justify-center mb-3">
										<button
											type="submit"
											className="btn btn-outline w-60 btn-primary"
										>
											Signup
										</button>
									</div>

									<div className="flex items-center">
										<div className="flex-1 h-0 border-t border-black"></div>
										<div className="mx-4 text-black">
											or
										</div>
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
										Sign up With Google
									</button>
								</div>
							</div>
						);
					}}
				</Formik>
			</div>
			{/* right */}
			<div className="hidden lg:flex lg:w-5/12 h-full w-full items-center justify-center bg-white">
				<div className="w-full bg-yellow-200">
					<img
						src={candidateLoginImage}
						className="h-600"
						alt="img unavailable"
					/>
				</div>
			</div>
		</div>
	);
}

export default CandidateSignupPage;
