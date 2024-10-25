import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux/reducer";
import { setLoaded, setLoading } from "../../../redux/slice/isLoading";
import { notify } from "../../../utils/toastMessage";
import ForgotResetPasswordForm from "../../../components/form/ForgotResetPasswordForm";

// API Methods
import {
    forgotPasswordCandidateApi,
    resetPasswordCandidateApi,
} from "../../../axios/apiMethods/auth-service/candidateAuth";
import {
    forgotPasswordRecruiterApi,
    resetPasswordRecruiterApi,
} from "../../../axios/apiMethods/auth-service/recruiterAuth";
import { IResponse } from "../../../types/api";




const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locationUrl = useLocation();
    
    const { userId } = useParams();

    // Check if the path contains the word "otpEmail"
    const isCandidateUrl: boolean = locationUrl.pathname.includes("candidate");
    const userType = isCandidateUrl ? "candidate" : "recruiter";

    const urlType = locationUrl.pathname.includes("forgotPassword")
        ? "forgot"
        : "reset"



    const authData: any = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const handleSubmit = async (values: any) => {
        try {
            dispatch(setLoading());
            let response: IResponse | null = null;

            // Choose API based on user type and action type
            if (userType === "candidate") {
                if (urlType === "forgot") {
                    response = await forgotPasswordCandidateApi(
                        userId!,
                        values.password
                    );
                    navigate("/candidate/signin");
                } else {
                    response = await resetPasswordCandidateApi(
                        authData.id,
                        values.password
                    );
                    navigate("/candidate");
                }
            } else if (userType === "recruiter") {
                if (urlType === "forgot") {
                    response = await forgotPasswordRecruiterApi(
                        userId!,
                        values.password
                    );
                    navigate("/recruiter/signin");
                } else {
                    response = await resetPasswordRecruiterApi(
                        authData.id,
                        values.password
                    );
                    navigate("/recruiter");
                }
            }

            if (response) {
                notify(response.message, "success");
            }
        } finally {
            dispatch(setLoaded());
        }
    };

    return <ForgotResetPasswordForm handleSubmit={handleSubmit} />;
};

export default UpdatePassword;
