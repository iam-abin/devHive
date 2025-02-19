import React from "react";
import { useFormik } from "formik";
import { IOtpFromProps } from "../../types/otp";
import { otpSchema } from "../../utils/validations/otp";

const OtpEnterForm: React.FC<IOtpFromProps> = ({
    email,
    phone,
    handleSubmit,
}) => {
    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: otpSchema,
        onSubmit: async (values) => {
            if (!values) {
                console.error("Form values are undefined.");
                return;
            }

            handleSubmit(values.otp);
        },
    });

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="md:w-6/12  sm:w-9/12  p-5 rounded-3xl shadow-2xl bg-stone-300 shadow-black ">
                <div className="mb-10">
                    <h1 className="text-center text-5xl font-bold">
                        Enter OTP
                    </h1>
                    <div className="w-16 h-1 bg-black mx-auto my-4"></div>
                </div>

                <form onSubmit={formik.handleSubmit} noValidate>
                    <div className="form-control w-6/6">
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            placeholder="Enter OTP"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.otp}
                            className={`input input-primary w-full rounded-xl ${
                                formik.errors.otp && formik.touched.otp
                                    ? "input-error"
                                    : null
                            }`}
                        />
                        <p>an otp is send to : {email ?? phone}</p>
                    </div>
                    <label className="label mb-3">
                        <span className="label-text-alt text-red-500">
                            {formik.errors.otp && formik.touched.otp && (
                                <span className="error label-text-alt">
                                    {formik.errors.otp}
                                </span>
                            )}
                        </span>
                    </label>

                    <div className="flex items-center justify-center mb-3">
                        <button
                            type="submit"
                            className={`btn btn-outline w-60 btn-primary`}
                        >
                            Submit OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpEnterForm;
