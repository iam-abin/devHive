import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/reducer";
import { setLoaded, setLoading } from "../../../redux/slice/isLoading";
import {
    forgotPasswordEmailCandidateApi,
    passwordResetMobileCandidateApi,
} from "../../../axios/apiMethods/auth-service/candidateAuth";
import Swal from "sweetalert2";
import Loading from "../../../components/loading/Loading";
import TopNavBarCandidate from "../../../components/navBar/TopNavBarCandidate";
import EmailOrMobile from "../../../components/form/EmailOrMobile";
import Footer from "../../../components/footer/Footer";
import { forgotPasswordEmailRecruiterApi } from "../../../axios/apiMethods/auth-service/recruiterAuth";
import { IEmailOrMobile } from "../../../types/otp";

function EnterEmailOrMobilePage() {
    const navigate = useNavigate();
    const locationUrl = useLocation();
    const dispatch = useDispatch();

    // Check if the path contains the word "otpEmail"
    const isEmailEnterPage: boolean = locationUrl.pathname.includes(
        "forgotPasswordEmail"
    );

    // Check if the path contains the word "otpEmail"
    const isCandidateUrl: boolean = locationUrl.pathname.includes("candidate");

    const userType = isCandidateUrl ? "candidate" : "recruiter";
    const valueType = isEmailEnterPage ? "email" : "mobile";

    const isLoading = useSelector(
        (store: RootState) => store.loading.isLoading
    );
    const userData: any = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const initialValue = {
        [valueType === "email" ? "email" : "mobile"]: "", // Use the resetType dynamically
    };

    const handleSubmit = async (values: IEmailOrMobile) => {
        try {
            dispatch(setLoading());

            let response;
            switch (userType) {
                case "candidate":
                    if (valueType === "email") {
                        response = await forgotPasswordEmailCandidateApi(
                            values.email!
                        );
                    } else {
                        response = await passwordResetMobileCandidateApi(
                            userData.email,
                            values.mobile!
                        );
                    }
                    break;

                case "recruiter":
                    if (valueType === "email") {
                        response = await forgotPasswordEmailRecruiterApi(
                            values.email!
                        );
                    } else {
                        response = await passwordResetMobileCandidateApi(
                            userData.email,
                            values.mobile!
                        );
                    }
                    break;

                default:
                    throw new Error("Invalid user type");
            }

            Swal.fire({
                text:
                    response?.message ||
                    `OTP sent to ${valueType} ${
                        values[valueType === "email" ? "email" : "mobile"]
                    }`,
                confirmButtonText: "Ok",
            }).then((res) => {
                if (res) {
                    if (valueType === "email") {
                        navigate(
                            `/${userType}/forgotPasswordOtp/${values.email}`
                        );
                    } else {
                        navigate(`/${userType}/passwordResetOtp`);
                    }
                }
            });
        } finally {
            dispatch(setLoaded());
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            {userData && userData.role === "candidate" && <TopNavBarCandidate />}
            <EmailOrMobile
                handleSubmit={handleSubmit}
                initialValue={initialValue}
            />
            {userData && userData.role === "candidate" && <Footer />}
        </>
    );
}

export default EnterEmailOrMobilePage;
