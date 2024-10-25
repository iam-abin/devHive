import React, { useEffect } from "react";
import TopNavBarCandidate from "../../components/navBar/TopNavBar";
import Footer from "../../components/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import CheckmarkSvg from "../../assets/payment/wired-flat-37-approve-checked-simple (3).gif";
import { getCandidateProfileApi } from "../../axios/apiMethods/profile-service/candidate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { setMyProfileData } from "../../redux/slice/user";

const PaymentSuccessFul: React.FC = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const candidateData: any = useSelector(
		(state: RootState) => state.userReducer.authData
	);
	const candidateUrl = location.pathname.includes("candidate");
	useEffect(() => {
		(async () => {
			const candidateProfileData = await getCandidateProfileApi(
				candidateData?.id
			);
			
			dispatch(setMyProfileData(candidateProfileData?.data));
		})();
	}, []);
	return (
		<>
			{candidateUrl && <TopNavBarCandidate />}
			<div className="bg-gray-100 h-screen flex justify-center items-center">
				<div className="bg-white p-6 w-2/5 shadow-2xl rounded-3xl">
					<img
						src={CheckmarkSvg}
						alt="Checkmark"
						className="text-green-600 w-16 h-16 mx-auto my-6"
					/>
					
					<div className="text-center">
						<h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
							Payment Done!
						</h3>
						<p className="text-gray-600 my-2">
							Thank you for completing your secure online payment.
						</p>
						<p> Have a great day! </p>
						<div className="py-10 text-center">
							<Link
								to="/candidate"
								className="px-12 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white font-semibold py-3"
							>
								GO TO HOME
							</Link>
						</div>
					</div>
				</div>
			</div>
			{candidateUrl && <Footer />}
		</>
	);
};

export default PaymentSuccessFul;
