import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import recruiterLoginImage from "../../../assets/auth/recruiter-login.svg"

import {
	initialSigninValues,
	signinSchema,
} from "../../../utils/validations/signin";
import { notify } from "../../../utils/toastMessage";
import { recruiterSigninApi } from "../../../axios/apiMethods/auth-service/recruiterAuth";
import { RootState } from "../../../redux/reducer";
import Loading from "../../../components/loading/Loading";
import { RiArrowLeftFill } from "react-icons/ri";
import { setUser } from "../../../redux/slice/user";
import RecruiterSignin from "../../../components/form/signin/RecruiterSignin";
import { ISignin } from "../../../types/user";
import { IResponse } from "../../../types/api";

function RecruiterSigninPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const handleSubmit = async (userData: ISignin) => {
		try {
			// dispatch(setLoading());
			const response: IResponse = await recruiterSigninApi(userData);
			dispatch(
				setUser({
					data: response.data,
					accessToken: response.accessToken!,
					refreshToken: response.refreshToken!,
				})
			);
			notify(response.message, "success");
			navigate("/recruiter");
		}finally {
			// dispatch(setLoaded());
		}
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<main className="w-full h-screen flex items-center  ">
			{/* left */}
			<div className="hidden lg:flex relative flex-col w-1/2 h-full  ">
				<button onClick={()=>navigate('/recruiter')} className="bg-slate-700 rounded-xl p-2 text-white w-20 flex justify-between items-center absolute m-10"><RiArrowLeftFill />home</button>
				<img
					src={recruiterLoginImage}
					className="w-full h-full object-cover"
					alt=""
				/>
			</div>

			{/* right */}
			<RecruiterSignin
                    handleSubmit={handleSubmit}
                    signinSchema={signinSchema}
                    initialSigninValues={initialSigninValues}
                />
		</main>
	);
}

export default RecruiterSigninPage;
