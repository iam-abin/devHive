import React from 'react';
import { useParams } from 'react-router-dom';
import OtpFromSignup from '../../components/candidate/OtpFromSignup';

function OtpFormPageSignup() {
  const { email } = useParams();

  return (
    <div>
      <OtpFromSignup email={email} />
    </div>
  );
}

export default OtpFormPageSignup;
