import { useEffect, useState } from "react";
import successImg from "../../assets/successIcon.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { emailVerifyApi } from "../../api/axios/auth/candidateAuth";
import { useDispatch } from "react-redux";
import { candidateSignin } from "../../redux/slice/candidateSlice/candidateAuthSlice";
import { setCandidate } from "../../redux/slice/candidateSlice/candidateDataSlice";
import { toast } from "react-toastify";

function EmailVerify() {
	const [isValidUrl, setIsValidUrl] = useState(false);
	const params = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const notify = (msg: any, type: string) => {
		type === "error"
			? toast.error(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  })
			: toast.success(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  });
	};


	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				console.log("in email verify");
				
				const url = `https://devhive.dev/api/v1/auth/candidate/${params.id}/verifyEmail/${params.token}`;
				const { data } = await emailVerifyApi(url);
				console.log(data);
				setIsValidUrl(true);
				dispatch(candidateSignin());
				dispatch(setCandidate(data));
				notify("login success","success")

				navigate("/candidate");
				// // Close the current tab
				// window.close();
			} catch (error) {
				console.log("url candidate", error);
				setIsValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [params]);

	return (
		<>
			{isValidUrl ? (
				<div className="w-screen h-screen flex flex-col gap-10 justify-center items-center">
					<img src={successImg} alt="" className="w-72" />
					<h1 className="text-4xl font-medium text-green-500 ">
						Email verified successfully
					</h1>
					<Link
						className="btn bg-slate-500 w-20"
						to="/candidate/signin"
					>
						login
					</Link>
				</div>
			) : (
				<h1 className="w-screen h-screen flex justify-center items-center font-bold text-9xl">
					404 Not Found
				</h1>
			)}
		</>
	);
}

export default EmailVerify;