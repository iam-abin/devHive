// ForgotPasswordPassword.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ForgotPasswordPassword: React.FC = () => {
  const passwordSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      // Handle the password submission logic here
      console.log('Password submitted:', values.password);
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-6/12">
        <div className="mb-10">
          <h1 className="text-center text-5xl font-bold">Enter Password</h1>
          <div className="w-16 h-1 bg-black mx-auto my-4"></div>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-control w-6/6">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`input input-primary w-full rounded-xl ${
                formik.errors.password && formik.touched.password ? 'input-error' : null
              }`}
            />
          </div>
          <label className="label mb-3">
            <span className="label-text-alt text-red-500">
              {formik.errors.password && formik.touched.password && (
                <span className="error label-text-alt">{formik.errors.password}</span>
              )}
            </span>
          </label>

          <div className="form-control w-6/6">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`input input-primary w-full rounded-xl ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? 'input-error'
                  : null
              }`}
            />
          </div>
          <label className="label mb-3">
            <span className="label-text-alt text-red-500">
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <span className="error label-text-alt">{formik.errors.confirmPassword}</span>
              )}
            </span>
          </label>

          <div className="flex items-center justify-center mb-3">
            <button type="submit" className={`btn btn-outline w-60 btn-primary`}>
              Submit Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPassword;
