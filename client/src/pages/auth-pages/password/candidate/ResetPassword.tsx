import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer';
import { useNavigate } from 'react-router-dom';
import { resetPasswordCandidateApi } from '../../../../axios/apiMethods/auth-service/candidateAuth';
import { notify } from '../../../../utils/toastMessage';
import ForgotResetPasswordForm from '../../../../components/form/ForgotResetPasswordForm';
import { setLoaded, setLoading } from '../../../../redux/slice/isLoading';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const candidateData: any = useSelector((store: RootState) => store.userReducer.authData);


  const handleSubmit = async (values: any) => {
    try {

      dispatch(setLoading());
      const response = await resetPasswordCandidateApi(candidateData.id, values.password);
      if (response.data.data === 'pending') {
        notify(response.data.message, 'error');
        return;
      }
      notify(response.message, 'success');
      navigate('/candidate');
    } finally {
			dispatch(setLoaded());
		}
  };

  return (
    <ForgotResetPasswordForm handleSubmit={handleSubmit} />
  );
};

export default ResetPassword;
