import React from "react";
import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";
import Footer from "../../components/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import CheckmarkSvg from "../../assets/payment/wired-flat-37-approve-checked-simple (3).gif";

const PaymentSuccessFul = () => {
	const location = useLocation();
	const candidateUrl = location.pathname.includes("candidate");
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

					{/* <svg
						viewBox="0 0 24 24"
						className="text-green-600 w-16 h-16 mx-auto my-6"
					>
						<path
							fill="currentColor"
							d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
						></path>
					</svg> */}
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
