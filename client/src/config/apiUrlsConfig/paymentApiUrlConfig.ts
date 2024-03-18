// const Admin_PAYMENT_URL = `payment/payment-route`;
const CANDIDATE_PAYMENT_URL = `payment/payment-route`;
const CANDIDATE_MEMBERSHIP_PLANS_URL = `payment/premium`;


const paymentApiUrlConfig = {

    // Candidate
	createPaymentUrl: `${CANDIDATE_PAYMENT_URL}/create-payment`,

	// Premium plans
	getAllMembershipPlansUrl: `${CANDIDATE_MEMBERSHIP_PLANS_URL}/get-all-premium-plans-candidate`,
}

export default paymentApiUrlConfig
