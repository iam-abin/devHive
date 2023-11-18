import { useEffect, useState } from "react";
import successImg from "../../assets/successIcon.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { emailRecruiterVerifyApi } from "../../api/axios/auth/recruiterAuth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setRecruiter } from "../../redux/slice/recruiterSlice/recruiterDataSlice";
import { recruiterSignin } from "../../redux/slice/recruiterSlice/recruiterAuthSlice";

function EmailVerifyRecruiter() {
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
				
				const url = `https://devhive.dev/api/v1/auth/recruiter/${params.id}/verifyEmail/${params.token}`;
				const { data } = await emailRecruiterVerifyApi(url);
				console.log(data);
				setIsValidUrl(true);
				dispatch(recruiterSignin());
				dispatch(setRecruiter(data));
				notify("login success","success")

				navigate("/recruiter");
				// // Close the current tab
				// window.close();
			} catch (error) {
				console.log("url recruiter", error);
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
						to="/recruiter/signin"
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

export default EmailVerifyRecruiter;
