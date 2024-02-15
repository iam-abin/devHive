import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer/reducer';
import { useNavigate } from 'react-router-dom';
import { resetPasswordCandidateApi } from '../../../../axios/apiMethods/auth-service/candidateAuth';
import { notify } from '../../../../utils/toastMessage';
import ForgotResetPasswordForm from '../../../../components/form/ForgotResetPasswordForm';
import { setLoaded, setLoading } from '../../../../redux/slice/loaderSlice/isLoading';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const candidateData: any = useSelector((state: RootState) => state.candidateData.data);


  const handleSubmit = async (values: any) => {
    try {

      console.log('Submitted password:', values.password);
      dispatch(setLoading());
      const response = await resetPasswordCandidateApi(candidateData.id, values.password);
      console.log('hiiii', response);
      if (response.data.data === 'pending') {
        notify(response.data.message, 'error');
        return;
      }
      notify(response.message, 'success');
      navigate('/candidate');
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
