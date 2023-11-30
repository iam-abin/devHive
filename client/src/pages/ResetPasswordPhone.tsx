// PasswordReset.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ResetPasswordPhone: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
    },
    validationSchema: Yup.object({
      mobileNumber: Yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required('Required'),
    }),
    onSubmit: async (values) => {
      // Your API call to handle the password reset logic goes here
      console.log('Submitting password reset request with:', values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-600">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="tel"
              pattern="[0-9]{10}"
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.errors.mobileNumber && 'border-red-500'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobileNumber}
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.mobileNumber}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPhone;
