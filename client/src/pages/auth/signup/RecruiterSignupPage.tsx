import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RiArrowLeftFill } from "react-icons/ri";

import { recruiterSignupApi } from "../../../axios/apiMethods/auth-service/recruiterAuth";

import recruiterLoginImage from "../../../assets/auth/recruiter-login.svg"
import { RootState } from "../../../redux/reducer";
import {
	setLoaded,
	setLoading,
} from "../../../redux/slice/isLoading";
import Loading from "../../../components/loading/Loading";
import RecruiterSignup from "../../../components/form/signup/RecruiterSignup";
import { initialSignupValues, signupSchema } from "../../../utils/validations/signup";
import { ISignup } from "../../../types/user";
import { IResponse } from "../../../types/api";

function RecruiterSignupPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);
	const handleSubmit = async (userData: ISignup) => {
		try {
			dispatch(setLoading());
			const response: IResponse = await recruiterSignupApi({...userData, role: "recruiter"});
			Swal.fire({
				text: response?.message || "Email sendedddd",
				confirmButtonText: "ok",
			}).then((res) => {

				if (res) {
					navigate(`/recruiter/otpSignupRecruiter/${userData.email}`);
				}
			});
		}finally {
			dispatch(setLoaded());
		}
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<main className="w-full h-screen md:flex md:items-center  ">
			{/* left */}
			<div className="hidden lg:flex relative flex-col md:w-1/2 h-full  ">
				<button onClick={()=>navigate('/recruiter')} className="bg-slate-700 rounded-xl p-2 text-white w-20 flex justify-between items-center absolute m-10"><RiArrowLeftFill />home</button>
				<img
					src={recruiterLoginImage}
					className="w-full h-full object-cover"
					alt=""
				/>
			</div>

			{/* right */}
			<RecruiterSignup  handleSubmit={handleSubmit} signupSchema={signupSchema} initialSignupValues={initialSignupValues}/>
		</main>
	);
}

export default RecruiterSignupPage;
