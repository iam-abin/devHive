import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";

import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

import { ErrorMessage, Field, Form, Formik } from "formik";

import {
	initialSigninValues,
	signInSchema,
} from "../../../utils/signin-validation";
import { adminSigninApi } from "../../../axios/apiMethods/auth-service/adminAuth";
import { setAdmin } from "../../../redux/slice/adminSlice/adminDataSlice";
import { notify } from "../../../utils/toastMessage";
import { useEffect } from "react";
import {
	setLoaded,
	setLoading,
} from "../../../redux/slice/loaderSlice/isLoading";

function AdminSigninPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (userData: any) => {
		try {
			dispatch(setLoading());
			const response = await adminSigninApi(userData);
			console.log("hiiii", response);
			dispatch(setAdmin(response));

			notify(response.message, "success");
			navigate("/admin");
		} catch (error: any) {
			console.log("in signin form error", error);

			notify(error.errors[0].message, "error");
		} finally {
			dispatch(setLoaded());
		}
	};

	const adminData = useSelector((state: RootState) => {
		return state.adminData.data;
	});

	useEffect(() => {
		console.log("admin is logged in", adminData);

		if (adminData) {
			navigate("/");
		}
	}, []);
	console.log("hi admin signin page");

	return (
		<div>
			<Formik
				initialValues={initialSigninValues}
				validationSchema={signInSchema}
				onSubmit={(values) => {
					if (!values) {
						console.error("Form values are undefined.");
						return;
					}
					console.log(values);
					handleSubmit(values);
				}}
			>
				{(formik) => {
					const { errors, touched } = formik;

					return (
						<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
							<main className="flex flex-col items-center justify-center w-full flex-1 bg-yellow-400 px-20 text-center">
								<div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
									{/* Signin section */}
									<div className="w-3/5 py-16 p-5 rounded-tl-2xl rounded-bl-2xl">
										<h2 className="text-3xl font-bold mb-2 text-sky-600">
											Sign in to account
										</h2>
										<div className="border-2 w-10 border-sky-600 inline-block mb-2"></div>

										<Form
											action=""
											className="flex flex-col items-center"
										>
											<div>
												<div className="bg-gray-100 w-72 pl-2 pt-1 flex items-center mb-1">
													<FaRegEnvelope className="text-gray-400 m-1" />
													<Field
														type="email"
														name="email"
														placeholder="Email"
														className={`bg-gray-100 text-sm pl-2 pt-2 pb-2 text-black bg-transparent border-b outline-none focus:outline-none ${
															errors.email &&
															touched.email
																? "input-error border-red-500"
																: null
														}`}
													/>
												</div>
												<div>
													<label className="label ml-7 mb-3">
														<span className="label-text-alt  text-red-500">
															<ErrorMessage
																name="email"
																className="error label-text-alt"
															/>
														</span>
													</label>
												</div>

												<div className="bg-gray-100 w-72 pl-2 pt-1 flex items-center mb-1">
													<MdLockOutline className="text-gray-400 m-1" />
													<Field
														type="password"
														name="password"
														placeholder="Password"
														className={`bg-gray-100 text-sm pl-2 pt-2 pb-2 text-black bg-transparent border-b outline-none focus:outline-none ${
															errors.password &&
															touched.password
																? "input-error border-red-500"
																: null
														}`}
													/>
												</div>
												<label className=" label ml-7 mb-3">
													<span className="label-text-alt  text-red-500">
														<ErrorMessage
															name="password"
															className="error label-text-alt"
														/>
													</span>
												</label>

												<div className="flex items-center justify-center mt-5 mb-3">
													<button
														type="submit"
														className="btn btn-outline w-60 btn-primary"
													>
														Signin
													</button>
												</div>
											</div>
										</Form>
									</div>

									{/* Signup section */}
									<div className="bg-sky-600 w-2/5 p-5 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
										<h2 className="text-3xl font-bold mb-2">
											Hello Admin!
										</h2>
										<div className="border-2 w-10 border-white inline-block mb-2"></div>
										<p className="mb-2">
											Fill up personal information and
											start your journey with us
										</p>
									</div>
								</div>
							</main>
						</div>
					);
				}}
			</Formik>
		</div>
	);
}

export default AdminSigninPage;
