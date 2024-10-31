import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { setLoaded, setLoading } from "../../redux/slice/isLoading";
import {
    verifyForgotPasswordOtpCandidateApi,
    verifyResetPasswordOtpCandidateApi,
    verifySignupOtpCandidateApi,
} from "../../axios/apiMethods/auth-service/candidateAuth";
import {
    verifyForgotPasswordOtpRecruiterApi,
    verifyResetPasswordOtpRecruiterApi,
    verifySignupOtpRecruiterApi,
} from "../../axios/apiMethods/auth-service/recruiterAuth";
import { notify } from "../../utils/toastMessage";
import OtpEnterForm from "../../components/form/otpEnterForm";
import Loading from "../../components/loading/BarLoading";
import { IResponse } from "../../types/api";
import { ROLES } from "../../utils/constants";

function OtpFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locationUrl = useLocation();

    const { email } = useParams();
    const userEmail: string = email || "";

    const isCandidateUrl: boolean = locationUrl.pathname.includes(ROLES.CANDIDATE);

    const userType = isCandidateUrl ? ROLES.CANDIDATE : ROLES.RECRUITER;
    const urlType = locationUrl.pathname.includes("passwordResetOtp")
        ? "reset"
        : locationUrl.pathname.includes("forgotPasswordOtp")
        ? "forgot"
        : "signup";

    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );
    const candidateData = useSelector(
        (store: RootState) => store.userReducer.authData
    );
    const recruiterData = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const handleSubmit = async (otp: string) => {
        try {
            dispatch(setLoading());
            let response: IResponse | null = null;

            switch (urlType) {
                case "forgot":
                    if (userType === ROLES.CANDIDATE) {
                        response = await verifyForgotPasswordOtpCandidateApi(
                            otp,
                            userEmail
                        );
                        navigate(
                            `/candidate/forgotPassword/${response.data.id}`
                        );
                    } else if (userType === ROLES.RECRUITER) {
                        response = await verifyForgotPasswordOtpRecruiterApi(
                            otp,
                            userEmail
                        );
                        navigate(
                            `/recruiter/forgotPassword/${response.data.id}`
                        );
                    }
                    break;
                case "reset":
                    if (userType === ROLES.CANDIDATE && candidateData) {
                        response = await verifyResetPasswordOtpCandidateApi(
                            candidateData.phone,
                            otp,
                            candidateData.email
                        );
                        navigate("/candidate/passwordReset");
                    }
                    if (userType === ROLES.RECRUITER && recruiterData) {
                        response = await verifyResetPasswordOtpRecruiterApi(
                            recruiterData.phone,
                            otp,
                            recruiterData.email
                        );
                        navigate("/recruiter/passwordReset");
                    }

                    break;
                case "signup":
                    if (userType === ROLES.CANDIDATE) {
                        response = await verifySignupOtpCandidateApi(
                            otp,
                            userEmail
                        );
                        navigate("/candidate/signin");
                    }
                    if (userType === ROLES.RECRUITER) {
                        response = await verifySignupOtpRecruiterApi(
                            otp,
                            userEmail
                        );
                        navigate("/recruiter/signin");
                    }
                    break;

                default:
                    throw new Error("Invalid OTP verification type");
            }

            if (response) {
                notify(response?.message, "success");
            }
        } finally {
            dispatch(setLoaded());
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return <OtpEnterForm email={userEmail} handleSubmit={handleSubmit} />;
}

export default OtpFormPage;
