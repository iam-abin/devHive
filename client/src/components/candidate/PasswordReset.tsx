import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer/reducer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPasswordCandidateApi } from '../../api/axios/auth/candidateAuth';

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const candidateData = useSelector(
		(state: RootState) => state.candidateData.candidate
	);
  

  const notify = (msg: any, type: string) => {
    type === 'error'
      ? toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
        })
      : toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
  };


  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const passwordResetSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  const onSubmit= async (values: any) => {
    try {
      if (!values) {
        console.error('Form values are undefined.');
        return;
      }
  
      console.log('Submitted password:', values.password);
  
      const response = await resetPasswordCandidateApi(candidateData.id,values.password );
      console.log('hiiii', response);
      if(response.data.data == "pending") {
        notify(response.data.message, 'error');
        return
      }
      notify(response.data.message, 'success');
      navigate('/candidate');
    } catch (error: any) {
      console.error('Error during OTP submission:', error);
      notify(
        error.response?.data?.errors?.[0]?.message ||
          'An error occurred during OTP submission',
        'error'
      );
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: passwordResetSchema,
    onSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6">Password Reset</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.errors.password && formik.touched.password ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`mt-1 p-2 w-full border rounded-md ${
                  formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Reset Password
            </button>
          </div>

          {formik.errors.password !== 'Passwords must match' && formik.touched.password && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}

          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
