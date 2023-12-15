// ForgotPasswordFormEmail.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ForgotPasswordFormEmail: React.FC = () => {
  const emailSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      // Handle the form submission logic here
      console.log('Email submitted:', values.email);
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-6/12">
        <div className="mb-10">
          <h1 className="text-center text-5xl font-bold">Enter Email</h1>
          <div className="w-16 h-1 bg-black mx-auto my-4"></div>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-control w-6/6">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`input input-primary w-full rounded-xl ${
                formik.errors.email && formik.touched.email ? 'input-error' : null
              }`}
            />
          </div>
          <label className="label mb-3">
            <span className="label-text-alt text-red-500">
              {formik.errors.email && formik.touched.email && (
                <span className="error label-text-alt">{formik.errors.email}</span>
              )}
            </span>
          </label>

          <div className="flex items-center justify-center mb-3">
            <button type="submit" className={`btn btn-outline w-60 btn-primary`}>
              Submit Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordFormEmail;
