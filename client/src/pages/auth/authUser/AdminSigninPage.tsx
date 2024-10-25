import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer";

import {
    initialSigninValues,
    signinSchema,
} from "../../../utils/validations/signin";
import { adminSigninApi } from "../../../axios/apiMethods/auth-service/adminAuth";
import { notify } from "../../../utils/toastMessage";
import { useEffect } from "react";
import { ISignin } from "../../../types/user";
import { setUser } from "../../../redux/slice/user";
import AdminSignin from "../../../components/form/auth/AdminSignin";
import { IResponse } from "../../../types/api";

function AdminSigninPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (userData: ISignin) => {
        const response: IResponse = await adminSigninApi(userData);
        dispatch(
            setUser({
                data: response.data,
                accessToken: response.accessToken!,
                refreshToken: response.refreshToken!,
            })
        );

        notify(response.message, "success");
        navigate("/admin");
    };

    const adminData = useSelector((store: RootState) => {
        return store.userReducer.authData;
    });

    useEffect(() => {
        if (adminData) {
            navigate("/");
        }
    }, [adminData, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-600 to-indigo-600">
            <main className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl bg-sky-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="md:flex">
                        {/* Signin section */}
                        <div className="md:w-2/3 sm:w-full px-6 py-16 bg-white border-b border-r rounded-t-lg md:rounded-tr-lg md:rounded-bl-none md:rounded-br-none">
                            <h2 className="text-3xl font-bold mb-2 text-sky-600 text-center">
                                Sign in to admin account
                            </h2>
                            <AdminSignin
                                handleSubmit={handleSubmit}
                                signinSchema={signinSchema}
                                initialSigninValues={initialSigninValues}
                            />
                        </div>
                        {/* Right side*/}
                        <div className="hidden sm:block sm:w-1/2 p-8 py-24 bg-sky-600 text-white rounded-b-lg md:rounded-bl-lg md:rounded-tr-none md:rounded-br-none">
                            <h2 className="text-3xl font-bold mb-2 text-center">
                                Hello Admin!
                            </h2>
                            <p className="mb-4 text-center">
                                Fill up personal information and start your
                                journey with us
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminSigninPage;
