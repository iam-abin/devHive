import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

// import { Link } from "react-router-dom"; // Assuming you're using React Router
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
	initialSigninValues,
	signInSchema,
} from "../../utils/signin-validation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSigninApi } from "../../axios/api/auth/adminAuth";
import { adminSignin, adminSignout } from "../../redux/slice/adminSlice/adminAuthSlice";
import { setAdmin } from "../../redux/slice/adminSlice/adminDataSlice";
import { RootState } from "../../redux/reducer/reducer";
import { useEffect } from "react";
import { notify } from "../../utils/toastMessage";

function Signin() {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state: RootState)=>{
		return state.adminAuth.adminLoggedIn;
	})

	useEffect(()=>{
		console.log("admin is logged in",isLoggedIn);
		
		if(isLoggedIn){
			navigate("/")
		}

	},[])

	console.log("hi admin signin");

	

	const handleSubmit = async (userData: any) => {
		try {
			const { data, message } = await adminSigninApi(userData);
			// console.log("hiiii", response);
			dispatch(adminSignin());
			dispatch(setAdmin(data));
		  console.log(message);
		  
			notify(message, "success");
			navigate("/admin");
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
										Fill up personal information and start
										your journey with us
									</p>
								</div>
							</div>
						</main>
					</div>
				);
			}}
		</Formik>
	);
}

export default Signin;
