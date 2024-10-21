import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
	initialSignupValues,
	signupSchema,
} from "../../../utils/validations/signup";
import { candidateSignupApi } from "../../../axios/apiMethods/auth-service/candidateAuth";


import candidateLoginImage from "../../../assets/auth/candidate-login.svg"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer";
import {
	setLoaded,
	setLoading,
} from "../../../redux/slice/isLoading";
import Loading from "../../../components/loading/Loading";
import { RiArrowLeftFill } from "react-icons/ri";
import CandidateSignup from "../../../components/form/signup/CandidateSignup";
import { ISignup } from "../../../types/user";
import { IResponse } from "../../../types/api";

function CandidateSignupPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);
	const handleSubmit = async (userData: ISignup) => {
		try {
			dispatch(setLoading());
			console.log("userData",userData);
			
			const response: IResponse = await candidateSignupApi({...userData, role: "candidate"});
			
			Swal.fire({
				text: response?.message || "Email sendedddd",
				confirmButtonText: "ok",
			}).then((res) => {
				if (res) {
					navigate(`/candidate/otpSignupCandidate/${userData.email}`);
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
		<div className="flex w-full h-screen">
			<button onClick={()=>navigate('/candidate')} className="bg-slate-700 rounded-xl p-2 text-white w-20 flex justify-between items-center absolute m-10"><RiArrowLeftFill />home</button>

			<div className="w-full lg:w-7/12 flex items-center justify-center">
				<CandidateSignup handleSubmit={handleSubmit} signupSchema={signupSchema} initialSignupValues={initialSignupValues} />
			</div>
			{/* right */}
			<div className="hidden lg:flex lg:w-5/12 h-full w-full items-center justify-center bg-white">
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
}

export default CandidateSignupPage;
