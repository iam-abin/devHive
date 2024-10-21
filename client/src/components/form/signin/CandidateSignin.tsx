import { ErrorMessage, Field, Form, Formik } from "formik";
import { ISigninProps } from "../../../types/user";
import { Link, useNavigate } from "react-router-dom";

const CandidateSignin = ({
    handleSubmit,
    signinSchema,
    initialSigninValues,
}: ISigninProps) => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={initialSigninValues}
            validationSchema={signinSchema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {(formik) => {
                const { errors, touched } = formik;

                return (
                    <div className="w-6/12 h-5/6 flex flex-col justify-between">
                        <div className="mb-10">
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
                                    autoComplete="email"
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
                                    autoComplete="password"
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
                                <label
                                    className="label mt-1"
                                    onClick={() =>
                                        navigate(
                                            "/candidate/forgotPasswordEmail"
                                        )
                                    }
                                >
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
                        <div className="flex items-center justify-center gap-3"></div>

                        <div className="w-full mt-5 items-center justify-center flex">
                            <p className="text-sm font-normal">
                                Don't have an account?
                                <Link
                                    to="/candidate/signup"
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
};

export default CandidateSignin;
