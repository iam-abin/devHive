import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RiArrowLeftFill } from "react-icons/ri";

import {
	initialSignupValues,
	signUpSchema,
} from "../../../utils/validations/signup-validation";
import { recruiterSignupApi } from "../../../axios/apiMethods/auth-service/recruiterAuth";

import recruiterLoginImage from "../../../assets/recruiter/recruiter-login.svg"
import { RootState } from "../../../redux/reducer";
import {
	setLoaded,
	setLoading,
} from "../../../redux/slice/loaderSlice/isLoading";
import Loading from "../../../components/loading/Loading";

function RecruiterSignupPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);
	const handleSubmit = async (userData: any) => {
		try {
			dispatch(setLoading());
			const response = await recruiterSignupApi({...userData, role: "recruiter"});
			Swal.fire({
				text: response?.message || "Email sendedddd",
				confirmButtonText: "ok",
			}).then((res) => {

				if (res) {
					navigate(`/recruiter/otpSignupRecruiter/${userData.email}`);
				}
			});
		}finally {
			dispatch(setLoaded());
		}
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<main className="w-full h-screen md:flex md:items-center  ">
			{/* left */}
			<div className="hidden lg:flex relative flex-col md:w-1/2 h-full  ">
				<button onClick={()=>navigate('/recruiter')} className="bg-slate-700 rounded-xl p-2 text-white w-20 flex justify-between items-center absolute m-10"><RiArrowLeftFill />home</button>
				<img
					src={recruiterLoginImage}
					className="w-full h-full object-cover"
					alt=""
				/>
			</div>

			{/* right */}
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
						<div className="md:w-1/2 h-full flex flex-col p-14  gap-10 items-center">
							<h1 className="text-xl font-semibold">
								Recruiter Sign Up
							</h1>

							<div className="w-full flex flex-col max-w-[450px]">
								<div className="w-full flex flex-col mb-10 ">
									<h3 className="text-3xl font-semibold mb-4">
										Sign Up
									</h3>
									<p className="text-base mb-4">
										welcome! please enter your details
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
												errors.password &&
												touched.password
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
		</main>
	);
}

export default RecruiterSignupPage;
