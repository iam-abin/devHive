// ResetPasswordFormMobile.tsx

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { passwordResetMobileCandidateApi } from '../../axios/api/auth/candidateAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer/reducer';
import { notify } from '../../utils/toastMessage';

const ResetPasswordFormMobile: React.FC = () => {
  const navigate = useNavigate();

  const candidateData = useSelector(
		(state: RootState) => state.candidateData.candidate
	);
  
  const mobileSchema = yup.object().shape({
    mobile: yup.string().matches(/^[0-9]+$/, 'Invalid mobile number').required('Mobile number is required'),
  });
  

  const formik = useFormik({
    initialValues: {
      mobile: '',
    },
    validationSchema: mobileSchema,
    onSubmit: async(values) => {
      // Handle the form submission logic here
      try {
        if (!values) {
          console.error('Form values are undefined.');
          return;
        }
        
        console.log('Mobile number submitted:', values.mobile);
    
        const response = await passwordResetMobileCandidateApi(candidateData.email, values.mobile);
        console.log('hiiii', response);
        notify(response.data.message, 'success');
        navigate('/candidate/passwordResetOtp');
      } catch (error: any) {
        console.error('Error during OTP submission:', error);
        notify(
          error.response?.data?.errors?.[0]?.message ||
            'An error occurred during OTP submission',
          'error'
        );
      }
      
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-6/12">
        <div className="mb-10">
          <h1 className="text-center text-5xl font-bold">Enter Mobile Number</h1>
          <div className="w-16 h-1 bg-black mx-auto my-4"></div>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-control w-6/6">
            <input
              type="tel" // Use type "tel" for mobile numbers
              id="mobile"
              name="mobile"
              placeholder="Enter Mobile Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              className={`input input-primary w-full rounded-xl ${
                formik.errors.mobile && formik.touched.mobile ? 'input-error' : null
              }`}
            />
          </div>
          <label className="label mb-3">
            <span className="label-text-alt text-red-500">
              {formik.errors.mobile && formik.touched.mobile && (
                <span className="error label-text-alt">{formik.errors.mobile}</span>
              )}
            </span>
          </label>

          <div className="flex items-center justify-center mb-3">
            <button type="submit" className={`btn btn-outline w-60 btn-primary`}>
              Submit Mobile Number
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordFormMobile;
