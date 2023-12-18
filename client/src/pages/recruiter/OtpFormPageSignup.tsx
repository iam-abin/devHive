import React from 'react';
import { useParams } from 'react-router-dom';
import OtpFromSignup from '../../components/recruiter/OtpFromSignup';


function OtpFormPageSignup() {
  const { email } = useParams();

  return (
    <div>
      <OtpFromSignup email={email} />
    </div>
  );
}

export default OtpFormPageSignup;
