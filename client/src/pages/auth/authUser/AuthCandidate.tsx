import React from "react";
import { RiArrowLeftFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
    initialSigninValues,
    signinSchema,
} from "../../../utils/validations/signin";
import {
    initialSignupValues,
    signupSchema,
} from "../../../utils/validations/signup";

import { candidateSigninApi } from "../../../axios/apiMethods/auth-service/candidateAuth";
import { candidateSignupApi } from "../../../axios/apiMethods/auth-service/candidateAuth";

import { setLoaded, setLoading } from "../../../redux/slice/isLoading";

import { notify } from "../../../utils/toastMessage";
import { RootState } from "../../../redux/reducer";
import Loading from "../../../components/loading/Loading";
import candidateLoginImage from "../../../assets/auth/candidate-login.svg";
import { setUser } from "../../../redux/slice/user";

import { IAuth } from "../../../types/user";
import { IResponse } from "../../../types/api";
import CandidateAuth from "../../../components/form/auth/CandidateAuth";
import { swal } from "../../../utils/swal";

const AuthCandidate: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locationUrl = useLocation();

    const isSigninUrl: boolean = locationUrl.pathname.includes("signin");
    const authType = isSigninUrl ? "signin" : "signup";

    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );

    const handleSubmit = async (userData: IAuth) => {
        try {
            if (authType === "signin") {
                dispatch(setLoading());
                const response: IResponse = await candidateSigninApi(userData);
                dispatch(
                    setUser({
                        data: response.data,
                        accessToken: response.accessToken!,
                        refreshToken: response.refreshToken!,
                    })
                );
                dispatch(
                    setUser({
                        data: response.data,
                        accessToken: response.accessToken!,
                        refreshToken: response.refreshToken!,
                    })
                );
                notify(response.message, "success");
                navigate("/candidate");
            } else {
                const response: IResponse = await candidateSignupApi({
                    ...userData,
                    role: "candidate",
                });

                swal(response?.message || "Email sendedddd", "ok", true).then(
                    (res) => {
                        if (res) {
                            navigate(
                                `/candidate/otpSignupCandidate/${userData.email}`
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
        <div className="flex w-full h-screen">
            <button
                onClick={() => navigate("/candidate")}
                className="bg-slate-700 rounded-xl p-2 text-white w-20 flex justify-between items-center absolute m-10"
            >
                <RiArrowLeftFill />
                home
            </button>

            <div
                className={`w-full ${
                    authType === "signup" ? "lg:w-6/12" : "lg:w-7/12"
                } p-11 flex items-center justify-center`}
            >
                <CandidateAuth
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

            {/* right side */}

            <div
                className={`hidden lg:flex ${
                    authType === "signin" ? "lg:w-6/12" : "lg:w-5/12"
                } h-full w-full items-center justify-center bg-white`}
            >
                <div className="w-full bg-yellow-200">
                    <img
                        src={candidateLoginImage}
                        className="h-600"
                        alt="img unavailable"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthCandidate;
