import { ErrorMessage, Field, Form, Formik } from "formik";
import { IAuthProps, IAuth, IRole } from "../../../types/user";
// import googleIcon from "../../../assets/google/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import SpinnerLoading from "../../loading/SpinnerLoading";
import { RootState } from "../../../redux/reducer";
import { useSelector } from "react-redux";

const CandidateAuth = ({
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
        <Formik<IAuth>
            initialValues={initialValues as IAuth}
            validationSchema={schemaValues}
            onSubmit={(values) => {
                handleSubmit({...values, role: IRole.CANDIDATE});
            }}
        >
            {(formik) => {
                const { errors, touched } = formik;
                return (
                    <div className="w-6/12 h-5/6">
                        <div className="mb-16">
                            <h1 className="text-center  text-5xl font-bold">
                                {authType === "signin" ? "Sign In" : "Sign Up"}
                            </h1>
                            <div className="w-16 h-1 bg-black mx-auto my-4"></div>
                        </div>

                        <Form noValidate>
                            {authType === "signup" && (
                                <div className="form-control w-6/6">
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        autoComplete="name"
                                        className={`input input-primary w-full rounded-xl ${
                                            errors?.name && touched?.name
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
                            )}

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
                                <label className="label mt-1">
                                    <span className="label-text-alt text-red-500">
                                        <ErrorMessage
                                            name="email"
                                            className="error label-text-alt"
                                        />
                                    </span>
                                </label>
                            </div>
                            {authType === "signup" && (
                                <div className="form-control w-6/6">
                                    <Field
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        autoComplete="phone"
                                        className={`input input-primary w-full rounded-xl ${
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
                                </div>
                            )}

                            <div className="form-control w-6/6">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="password"
                                    className={`input input-primary w-full rounded-xl ${
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
                            {authType === "signin" && (
                                <label
                                    className="label flex justify-end"
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
                            )}
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-full mt-5 items-center justify-center flex">
                                    {authType === "signin" ? (
                                        <p className="text-sm font-normal">
                                            Don't have an account?
                                            <Link
                                                to="/candidate/signup"
                                                className="font-semibold underline underline-offset-2 cursor-pointer"
                                            >
                                                Sign up
                                            </Link>
                                        </p>
                                    ) : (
                                        <div className="w-full items-center justify-center flex">
                                            <p className="text-sm font-normal">
                                                Already have an account?
                                                <Link
                                                    to="/candidate/signin"
                                                    className="font-semibold underline underline-offset-2 cursor-pointer"
                                                >
                                                    Sign in
                                                </Link>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-center mb-3">
                                <button
                                    type="submit"
                                    className={`btn btn-outline w-60 btn-primary ${
                                        isLoading
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <SpinnerLoading />
                                    ) : authType === "signin" ? (
                                        "Signin"
                                    ) : (
                                        "Signup"
                                    )}
                                </button>
                            </div>

                            {/* <div className="flex items-center">
                                <div className="flex-1 h-0 border-t border-black"></div>
                                <div className="mx-4 text-black">or</div>
                                <div className="flex-1 h-0 border-t border-black"></div>
                            </div> */}
                        </Form>
                        {/* <div className="flex items-center justify-center gap-3">
                            <button className="btn border-gray-600 w-60">
                                <img src={googleIcon} className="w-7" alt="" />
                                Sign up With Google
                            </button>
                        </div> */}
                    </div>
                );
            }}
        </Formik>
    );
};

export default CandidateAuth;
