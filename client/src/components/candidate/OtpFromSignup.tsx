// OtpFromSignup.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCandidate } from '../../redux/slice/candidateSlice/candidateDataSlice';
import { candidateSignin } from '../../redux/slice/candidateSlice/candidateAuthSlice';

interface OtpFromSignupProps {
  email?: string;
}

const otpSchema = yup.object().shape({
  otp: yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
});

const OtpFromSignup: React.FC<OtpFromSignupProps> = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify = (msg: any, type: string) => {
    type === 'error'
      ? toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
        })
      : toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
  };

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        if (!values) {
          console.error('Form values are undefined.');
          return;
        }
    
        console.log('Submitted OTP:', values.otp);
    
        const response = await verifySignupOtpCandidateApi(values.otp, email!);
        console.log('hiiii', response);
        dispatch(candidateSignin());
        dispatch(setCandidate(response.data.data));
        notify(response.data.message, 'success');
        navigate('/candidate');
      } catch (error: any) {
        console.error('Error during OTP submission:', error);
        notify(
          error.response?.data?.message ||
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
            <p>an email is send to : {email}</p>
          </div>
          <label className="label mb-3">
            <span className="label-text-alt text-red-500">
              {formik.errors.otp && formik.touched.otp && (
                <span className="error label-text-alt">{formik.errors.otp}</span>
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

export default OtpFromSignup;
