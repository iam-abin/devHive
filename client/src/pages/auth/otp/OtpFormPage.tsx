import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer";
import { setLoaded, setLoading } from "../../../redux/slice/isLoading";
import {
    verifyForgotPasswordOtpCandidateApi,
    verifyResetPasswordOtpCandidateApi,
    verifySignupOtpCandidateApi,
} from "../../../axios/apiMethods/auth-service/candidateAuth";
import { setUser } from "../../../redux/slice/user";
import {
    verifyForgotPasswordOtpRecruiterApi,
    verifyResetPasswordOtpRecruiterApi,
    verifySignupOtpRecruiterApi,
} from "../../../axios/apiMethods/auth-service/recruiterAuth";
import { notify } from "../../../utils/toastMessage";
import OtpEnterForm from "../../../components/form/otpEnterForm";
import Loading from "../../../components/loading/Loading";
import { IResponse } from "../../../types/api";

function OtpFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locationUrl = useLocation();

    const { email } = useParams();
    const userEmail = email || "";

    // Check if the path contains the word "otpEmail"
    const isCandidateUrl: boolean = locationUrl.pathname.includes("candidate");

    const userType = isCandidateUrl ? "candidate" : "recruiter";
    const urlType = locationUrl.pathname.includes("passwordResetOtp")
        ? "reset"
        : locationUrl.pathname.includes("forgotPasswordOtp")
        ? "forgot"
        : "signup";

    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );
    const candidateData: any = useSelector(
        (store: RootState) => store.userReducer.authData
    );
    const recruiterData: any = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const handleSubmit = async (otp: string) => {
        try {
            dispatch(setLoading());
            let response: IResponse | null = null;

            switch (urlType) {
                case "forgot":
                    if (userType === "candidate") {
                        response = await verifyForgotPasswordOtpCandidateApi(
                            otp,
                            userEmail
                        );
                        navigate(
                            `/candidate/forgotPassword/${response.data.id}`
                        );
                    } else if (userType === "recruiter") {
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
                    if (userType === "candidate") {
                        response = await verifyResetPasswordOtpCandidateApi(
                            candidateData?.phone,
                            otp,
                            candidateData.email
                        );
                        navigate("/candidate/passwordReset");
                    }
                    if (userType === "recruiter") {
                        response = await verifyResetPasswordOtpRecruiterApi(
                            recruiterData?.phone,
                            otp,
                            recruiterData?.email
                        );
                        navigate("/recruiter/passwordReset");
                    }

                    break;
                case "signup":
                    if (userType === "candidate") {
                        response = await verifySignupOtpCandidateApi(
                            otp,
                            userEmail
                        );
                        dispatch(setUser(response));
                        navigate("/candidate");
                    }
                    if (userType === "recruiter") {
                        response = await verifySignupOtpRecruiterApi(
                            otp,
                            userEmail
                        );
                        dispatch(setUser(response));
                        navigate("/recruiter");
                    }
                    break;

                default:
                    throw new Error("Invalid OTP verification type");
            }

            if (response) {
                notify(response?.message, "success");
            }
        } catch (error: any) {
            notify("An error occurred: " + error.message, "error");
        } finally {
            dispatch(setLoaded());
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <OtpEnterForm email={userEmail} handleSubmit={handleSubmit} />
        </div>
    );
}

export default OtpFormPage;
