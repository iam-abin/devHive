import React, { useEffect, useState } from "react";
import { createPaymentApi } from "../../axios/apiMethods/payment-service/candidate";
import { RootState } from "../../redux/reducer";

import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPlanCard from "../../components/cards/PaymentPlanCard";
import { getAllMembershipPlansByCandidateApi } from "../../axios/apiMethods/premium-plans-service/candidate";
import PaymentPlanCardShimmer from "../../components/shimmer/PaymentPlanCardShimmer";

const PaymentPlans: React.FC = () => {
    const [membershipPlansData, setMembershipPlansData] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const candidateData = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const candidateProfileData = useSelector(
        (store: RootState) => store.userReducer.myProfile
    );

    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("VITE_STRIPE_PUBLISHABLE_KEY must be defined");
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const recruiters = await getAllMembershipPlansByCandidateApi();
                setMembershipPlansData(recruiters.data);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // const amount: number = 299; // Set your desired amount here or get it dynamically

    // payment integration
    const makePayment = async (membershipPlanId: string, amount: number) => {
        const stripePromise = await loadStripe(
            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );

        const paymentData = {
            userId: candidateData?.id,
            amount,
            membershipPlanId,
        };

        const payment = await createPaymentApi(paymentData);

        await stripePromise?.redirectToCheckout({
            sessionId: payment?.data?.stripeId,
        });
    };

    return (
        <div className="flex flex-col gap-12 bg-white dark:bg-gray-900 ">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Premium Plans
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Unlock premium access to view recruiter profiles by
                        choosing our affordable payment plan and elevate your
                        job search experience.
                    </p>
                </div>
                <div className="flex flex-wrap md:flex-row gap-5 sm:flex-col justify-center">
                    {/* Pricing Card */}
                    {
                    loading ?
                     (
                        <PaymentPlanCardShimmer />
                    ) 
                    : membershipPlansData.length > 0 ? (
                        membershipPlansData.map((plan: any) => {
                            return (
                                <PaymentPlanCard
                                    key={plan?.id}
                                    makePayment={makePayment}
                                    planData={plan}
                                    candidateProfileData={candidateProfileData}
                                />
                            );
                        })
                    ) : (
                        "No plans are avaiable"
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default PaymentPlans;
