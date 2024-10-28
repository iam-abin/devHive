import { ErrorMessage, Field, Form, Formik } from "formik";
import { ISigninProps } from "../../../types/user";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer";
import SpinnerLoading from "../../loading/SpinnerLoading";

const AdminSignin = ({
    handleSubmit,
    signinSchema,
    initialSigninValues,
}: ISigninProps) => {
    const isLoading: boolean = useSelector(
        (store: RootState) => store.loading.isLoading
    );
    return (
        <Formik
            initialValues={initialSigninValues}
            validationSchema={signinSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {() => (
                <Form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <div className="flex items-center bg-gray-100 rounded-t-md">
                                <FaRegEnvelope className="text-gray-400 m-1" />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="password"
                                    className="w-full py-2 pl-2 text-sm text-black bg-transparent border-b outline-none focus:outline-none"
                                />
                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm ml-1"
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center bg-gray-100">
                                <MdLockOutline className="text-gray-400 m-1" />
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="password"
                                    className="w-full py-2 pl-2 text-sm text-black bg-transparent border-b outline-none focus:outline-none"
                                />
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm ml-1"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full py-2 mt-6 font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 ${
                                isLoading ? "cursor-not-allowed opacity-50" : ""
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? <SpinnerLoading /> : "Sign in"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AdminSignin;
