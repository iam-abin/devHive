// SelfContainedOtpForm.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ForgotPasswordOtpFrom2: React.FC = () => {
  const otpSchema = yup.object().shape({
    otp: yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
  });

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: otpSchema,
    onSubmit: (values) => {
      // Handle the OTP submission logic here
      console.log('OTP submitted:', values.otp);
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-6/12">
        <div className="mb-10">
          <h1 className="text-center text-5xl font-bold">Enter OTP</h1>
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
                formik.errors.otp && formik.touched.otp ? 'input-error' : null
              }`}
            />
          </div>
          <label className="label mb-3">
            <span className="label-text-alt text-red-500">
              {formik.errors.otp && formik.touched.otp && (
                <span className="error label-text-alt">{formik.errors.otp}</span>
              )}
            </span>
          </label>

          <div className="flex items-center justify-center mb-3">
            <button type="submit" className={`btn btn-outline w-60 btn-primary`}>
              Submit OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordOtpFrom2;
