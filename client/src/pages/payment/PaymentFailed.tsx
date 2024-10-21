import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";

const PaymentFailed: React.FC = () => {
	const location = useLocation();
	const candidateUrl = location.pathname.includes("candidate");
	return (
		<>
			{candidateUrl && <TopNavBarCandidate />}
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-8  rounded-2xl shadow-lg max-w-md w-full">
					<h2 className="text-3xl text-center font-semibold text-red-600 mb-4">
						Payment Failed
					</h2>
					<p className="text-gray-600 mb-6 text-center">
						Oops! It seems like there was an issue processing your
						payment. Please try again later.
					</p>
					<div className="flex justify-center">
					<Link
						to="/candidate"
						className="px-5 bg-indigo-500  hover:bg-indigo-700 rounded-md text-white text-center font-semibold py-3"
					>
						GO TO HOME
					</Link>
					</div>
				</div>
			</div>
			{candidateUrl && <Footer />}
		</>
	);
};

export default PaymentFailed;
