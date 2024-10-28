import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { IAuthProps, IRole } from "../../../types/user";
import SpinnerLoading from "../../loading/SpinnerLoading";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer";

const RecruiterAuth = ({
    handleSubmit,
    schemaValues,
    initialValues,
    authType,
}: IAuthProps) => {
    const navigate = useNavigate();
    const isLoading: boolean = useSelector(
        (store: RootState) => store.loading.isLoading
    );

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schemaValues}
            onSubmit={(values) => {
                handleSubmit({...values, role: IRole.RECRUITER});
            }}
        >
            {(formik) => {
                const { errors, touched } = formik;
                return (
                    <div className="md:w-1/2 h-full flex flex-col p-14  gap-10 items-center">
                        <h1 className="text-xl font-semibold">
                            Recruiter{" "}
                            {authType === "signin" ? "Signin" : "Signup"}
                        </h1>

                        <div className="w-full flex flex-col max-w-[450px]">
                            <div className="w-full flex flex-col mb-10 ">
                                <h3 className="text-3xl font-semibold mb-4">
                                    {authType === "signin"
                                        ? "Signin"
                                        : "Signup"}
                                </h3>
                                <p className="text-base mb-4">
                                    welcome! please enter your details
                                </p>
                            </div>
                            <Form noValidate>
                                <div className="w-full flex flex-col">
                                    {authType === "signup" && (
                                        <>
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                autoComplete="name"
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
                                        </>
                                    )}

                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="email"
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

                                    {authType === "signup" && (
                                        <>
                                            <Field
                                                type="text"
                                                name="phone"
                                                placeholder="Phone"
                                                autoComplete="phone"
                                                className={`w-full py-2 mt-2 text-black bg-transparent border-b border-black outline-none focus:outline-none ${
                                                    errors.phone &&
                                                    touched.phone
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
                                        </>
                                    )}

                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        autoComplete="password"
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
                                <div className="w-full flex flex-col mt-4">
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-black rounded-md p-4 my-2 text-center flex items-center justify-center"
                                        disabled={isLoading} // Disable when loading
                                    >
                                        {isLoading ? (
                                            <SpinnerLoading /> // Show spinner if loading
                                        ) : authType === "signin" ? (
                                            "Sign In"
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </button>
                                </div>
                                {authType === "signin" && (
                                    <label
                                        className="label text-end flex justify-end"
                                        onClick={() =>
                                            navigate(
                                                "/recruiter/forgotPasswordEmail"
                                            )
                                        }
                                    >
                                        <span className="label-text-alt cursor-pointer">
                                            Forgot Password?
                                        </span>
                                    </label>
                                )}
                                <div className="w-full items-center justify-center flex">
                                    {authType === "signin" ? (
                                        <p className="text-sm font-normal">
                                            Don't have an account?
                                            <Link
                                                to="/recruiter/signup"
                                                className="font-semibold underline underline-offset-2 cursor-pointer"
                                            >
                                                Sign up
                                            </Link>
                                        </p>
                                    ) : (
                                        <p className="text-sm font-normal">
                                            Already have an account?
                                            <Link
                                                to="/recruiter/signin"
                                                className="font-semibold underline underline-offset-2 cursor-pointer"
                                            >
                                                Sign in
                                            </Link>
                                        </p>
                                    )}
                                </div>
                            </Form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default RecruiterAuth;
