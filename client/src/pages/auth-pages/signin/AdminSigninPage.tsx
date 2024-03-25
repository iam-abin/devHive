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

function AdminSigninPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (userData: any) => {
        try {
            const response = await adminSigninApi(userData);
            console.log("hiiii", response);
            dispatch(setAdmin(response));

            notify(response.message, "success");
            navigate("/admin");
        } catch (error: any) {
            console.log("in signin form error", error);
            console.log("in signin form errorrrrr", error.response.data.errors[0].message);

            notify(error.response.data.errors[0].message, "error");
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
    }, [adminData, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-600 to-indigo-600">
            <main className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl bg-sky-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="md:flex">
                        {/* Signin section */}
                        <div className="md:w-2/3 sm:w-full px-6 py-16 bg-white border-b border-r rounded-t-lg md:rounded-tr-lg md:rounded-bl-none md:rounded-br-none">

                            <h2 className="text-3xl font-bold mb-2 text-sky-600 text-center">Sign in to admin account</h2>
                            <Formik
                                initialValues={initialSigninValues}
                                validationSchema={signInSchema}
                                onSubmit={(values) => handleSubmit(values)}
                            >
                                {(formik) => (
                                    <Form className="mt-8 space-y-6">
                                        <div className="rounded-md shadow-sm -space-y-px">
                                            <div className="mb-4">
                                                <div className="flex items-center bg-gray-100 rounded-t-md">
                                                    <FaRegEnvelope className="text-gray-400 m-1" />
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        className="w-full py-2 pl-2 text-sm text-black bg-transparent border-b outline-none focus:outline-none"
                                                    />
                                                </div>
                                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm ml-1" />
                                            </div>
                                            <div className="mb-4">
                                                <div className="flex items-center bg-gray-100">
                                                    <MdLockOutline className="text-gray-400 m-1" />
                                                    <Field
                                                        type="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        className="w-full py-2 pl-2 text-sm text-black bg-transparent border-b outline-none focus:outline-none"
                                                    />
                                                </div>
                                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm ml-1" />
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full py-2 mt-6 font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                                            >
                                                Sign in
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        {/* Right side*/}
                        <div className="hidden sm:block sm:w-1/2 p-8 py-24 bg-sky-600 text-white rounded-b-lg md:rounded-bl-lg md:rounded-tr-none md:rounded-br-none">
                            <h2 className="text-3xl font-bold mb-2 text-center">Hello Admin!</h2>
                            <p className="mb-4 text-center">Fill up personal information and start your journey with us</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminSigninPage;
