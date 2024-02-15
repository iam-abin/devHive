import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer/reducer';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../../../utils/toastMessage';
import ForgotResetPasswordForm from '../../../../components/form/ForgotResetPasswordForm';
import { setLoaded, setLoading } from '../../../../redux/slice/loaderSlice/isLoading';
import { resetPasswordRecruiterApi } from '../../../../axios/apiMethods/auth-service/recruiterAuth';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const recruiterData: any = useSelector((state: RootState) => state.recruiterData.data);


  const handleSubmit = async (values: any) => {
    try {

      console.log('Submitted password:', values.password);
      dispatch(setLoading());
      const response = await resetPasswordRecruiterApi(recruiterData.id, values.password);
      console.log('hiiii', response);
      // if (response.data.data === 'pending') {
      //   notify(response.data.message, 'error');
      //   return;
      // }
      notify(response.message, 'success');
      navigate('/recruiter');
    } catch (error: any) {
      console.error('Error during reset password submission:', error);
      notify(
        error.response?.data?.errors?.[0]?.message ||
          'An error occurred during reset password submission',
        'error'
      );
    }finally {
			dispatch(setLoaded());
		}
  };

  return (
    <ForgotResetPasswordForm handleSubmit={handleSubmit} />
  );
};

export default ResetPassword;
