import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducer";
import { setLoaded, setLoading } from "../../redux/slice/isLoading";
import {
    forgotPasswordEmailCandidateApi,
    passwordResetMobileCandidateApi,
} from "../../axios/apiMethods/auth-service/candidateAuth";
import Loading from "../../components/loading/Loading";
import EmailOrMobile from "../../components/form/EmailOrMobile";
import {
    forgotPasswordEmailRecruiterApi,
    passwordResetMobileRecruiterApi,
} from "../../axios/apiMethods/auth-service/recruiterAuth";
import { IEmailOrMobile } from "../../types/otp";
import { swal } from "../../utils/swal";

function EnterEmailOrMobilePage() {
    const navigate = useNavigate();
    const locationUrl = useLocation();
    const dispatch = useDispatch();

    const isEmailEnterPage: boolean = locationUrl.pathname.includes(
        "forgotPasswordEmail"
    );

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
                    console.log("recruiter ====== ", valueType);
                    console.log("userData ====== ", userData);

                    if (valueType === "email") {
                        response = await forgotPasswordEmailRecruiterApi(
                            values.email!
                        );
                    } else {
                        response = await passwordResetMobileRecruiterApi(
                            userData.email,
                            values.mobile!
                        );
                    }
                    break;

                default:
                    throw new Error("Invalid user type");
            }

            console.log(response);

            swal(
                response?.message ||
                    `OTP sent to ${valueType} ${
                        values[valueType === "email" ? "email" : "mobile"]
                    }`,
                "Ok",
                true
            ).then((res) => {
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
        <EmailOrMobile
            handleSubmit={handleSubmit}
            initialValue={initialValue}
        />
    );
}

export default EnterEmailOrMobilePage;
