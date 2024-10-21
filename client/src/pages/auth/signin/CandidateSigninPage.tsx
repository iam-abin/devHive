import React from "react";
import { RiArrowLeftFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    initialSigninValues,
    signinSchema,
} from "../../../utils/validations/signin";
import { notify } from "../../../utils/toastMessage";
import { candidateSigninApi } from "../../../axios/apiMethods/auth-service/candidateAuth";
import { RootState } from "../../../redux/reducer";
import Loading from "../../../components/loading/Loading";
import candidateLoginImage from "../../../assets/auth/candidate-login.svg";
import { setUser } from "../../../redux/slice/user";
import CandidateSignin from "../../../components/form/signin/CandidateSignin";
import { ISignin } from "../../../types/user";
import { IResponse } from "../../../types/api";

const CandidateSigninPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );

    const handleSubmit = async (userData: ISignin) => {
        try {
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
        } finally {
            // dispatch(setLoaded());
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
            <div className="w-full lg:w-6/12 flex items-center justify-center">
                <CandidateSignin
                    handleSubmit={handleSubmit}
                    signinSchema={signinSchema}
                    initialSigninValues={initialSigninValues}
                />
            </div>
            <div className="hidden lg:flex lg:w-6/12 h-full w-full items-center justify-center bg-white">
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

export default CandidateSigninPage;
