import React, { useEffect, useState } from "react";
import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";
import Footer from "../../components/footer/Footer";
import { createPaymentApi } from "../../axios/apiMethods/payment-service/candidate";
import { RootState } from "../../redux/reducer/reducer";

import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPlanCard from "../../components/cards/PaymentPlanCard";
import { getAllMembershipPlansByCandidateApi } from "../../axios/apiMethods/premium-plans-service/candidate";
import { notify } from "../../utils/toastMessage";

const PaymentPlans: React.FC = () => {
	const [membershipPlansData, setMembershipPlansData] = useState<[]>([]);

	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);

	const candidateProfileData: any = useSelector(
		(state: RootState) => state.candidateProfile.candidateProfile
	);
	
	if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
		throw new Error("VITE_STRIPE_PUBLISHABLE_KEY must be defined");
	}

	useEffect(() => {
		(async () => {
			try {
				const recruiters = await getAllMembershipPlansByCandidateApi();
				
				setMembershipPlansData(recruiters.data);
			} catch (error: any) {
				notify(error.response.data.errors[0].message, "error");
				console.error(error);
			}
		})();
	}, []);

	// const amount: number = 299; // Set your desired amount here or get it dynamically

	// payment integration
	const makePayment = async (membershipPlanId: string, amount: number) => {
		
		try {
			const stripePromise = await loadStripe(
				import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
			);
			
			const paymentData = {
				userId: candidateData?.id,
				amount,
				membershipPlanId,
			};
			
			const payment = await createPaymentApi(paymentData);
			console.log(payment);
			
			await stripePromise?.redirectToCheckout({
				sessionId: payment?.data?.stripeId,
			});
		} catch (error: any) {
			// notify(error.response.data.errors[0].message, "error");
			console.error(error);
		}
	};

	return (
		<>
			<TopNavBarCandidate />

			<section className="flex flex-col gap-12 bg-white dark:bg-gray-900 ">
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					<div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
						<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
							Premium Plans
						</h2>
						<p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
							Unlock premium access to view recruiter profiles by
							choosing our affordable payment plan and elevate
							your job search experience.
						</p>
					</div>
					<div className="flex md:flex-row gap-5 sm:flex-col flex-wrap justify-center">
						{/* Pricing Card */}
						{membershipPlansData.length > 0
							? membershipPlansData.map((plan: any) => {
									return (
										<PaymentPlanCard
											key={plan?.id}
											makePayment={makePayment}
											planData={plan}
											candidateProfileData={
												candidateProfileData
											}
										/>
									);
							  })
							: "No plans are avaiable"}
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default PaymentPlans;
