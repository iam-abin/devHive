import { useNavigate, useParams } from "react-router-dom";
import {
    setLoaded,
    setLoading,
} from "../../../../redux/slice/isLoading";
import { useDispatch, useSelector } from "react-redux";
import { verifyForgotPasswordOtpCandidateApi } from "../../../../axios/apiMethods/auth-service/candidateAuth";
import { notify } from "../../../../utils/toastMessage";
import { RootState } from "../../../../redux/reducer";
import Loading from "../../../../components/loading/Loading";
import OtpEnterForm from "../../../../components/form/otpEnterForm";

function OtpFormPageForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useParams();

    // Provide a default value (empty string) if email is undefined
    const userEmail = email || "";

    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );

    const handleSubmit = async (otp: string) => {
        try {
            dispatch(setLoading());
            const response = await verifyForgotPasswordOtpCandidateApi(
                otp,
                email!
            );
            notify(response?.message, "success");
            navigate(`/candidate/forgotPassword/${response.data.id}`);
        } finally {
            dispatch(setLoaded());
        }

        if (isLoading) {
            return <Loading />;
        }
    };

    return (
        <div>
            {/* Pass email and handleSubmit as props to OtpEnterForm */}
            <OtpEnterForm email={userEmail} handleSubmit={handleSubmit} />
        </div>
    );
}

export default OtpFormPageForgotPassword;
