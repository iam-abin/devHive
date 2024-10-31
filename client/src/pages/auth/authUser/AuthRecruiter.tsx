import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import recruiterLoginImage from "../../../assets/auth/recruiter-login.svg";
import { notify } from "../../../utils/toastMessage";
import { recruiterSigninApi } from "../../../axios/apiMethods/auth-service/recruiterAuth";
import { recruiterSignupApi } from "../../../axios/apiMethods/auth-service/recruiterAuth";
import { RootState } from "../../../redux/reducer";
import Loading from "../../../components/loading/BarLoading";
import { RiArrowLeftFill } from "react-icons/ri";
import { setUser } from "../../../redux/slice/user";

import { setLoaded, setLoading } from "../../../redux/slice/isLoading";

import RecruiterSignup from "../../../components/form/auth/RecruiterAuth";
import {
    initialSignupValues,
    signupSchema,
} from "../../../utils/validations/signup";
import { IResponse } from "../../../types/api";
import {
    initialSigninValues,
    signinSchema,
} from "../../../utils/validations/signin";
import { swal } from "../../../utils/swal";
import { IAuth } from "../../../types/user";

function AuthRecruiter() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locationUrl = useLocation();

    const isSigninUrl: boolean = locationUrl.pathname.includes("signin");
    const authType: "signin" | "signup" = isSigninUrl ? "signin" : "signup";

    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );
    
    const handleSubmit = async (userData: Partial<IAuth>) => {
        try {
            dispatch(setLoading());
            if (authType === "signin") {
                const response = await recruiterSigninApi(userData);
                dispatch(
                    setUser({
                        data: response.data,
                    })
                );
                notify(response.message, "success");
                navigate("/recruiter");
            } else {
                const response: IResponse = await recruiterSignupApi({
                    ...userData,
                    role: "recruiter",
                });
                swal(response?.message || "Email sendedddd", "ok", true).then(
                    (res) => {
                        if (res) {
                            navigate(
                                `/recruiter/otpSignupRecruiter/${userData.email}`
                            );
                        }
                    }
                );
            }
        } finally {
            dispatch(setLoaded());
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full h-screen flex items-center  ">
            {/* left */}
            <div className="hidden lg:flex relative flex-col w-1/2 h-full  ">
                <button
                    onClick={() => navigate("/recruiter")}
                    className="bg-slate-700 rounded-xl p-2 text-white w-20 flex justify-between items-center absolute m-10"
                >
                    <RiArrowLeftFill />
                    home
                </button>
                <img
                    src={recruiterLoginImage}
                    className="w-full h-full object-cover"
                    alt=""
                />
            </div>

            {/* right */}
            {/* right */}
            <RecruiterSignup
                handleSubmit={handleSubmit}
                schemaValues={
                    authType === "signin" ? signinSchema : signupSchema
                }
                initialValues={
                    authType === "signin"
                        ? initialSigninValues
                        : initialSignupValues
                }
                authType={authType}
            />
        </div>
    );
}

export default AuthRecruiter;
