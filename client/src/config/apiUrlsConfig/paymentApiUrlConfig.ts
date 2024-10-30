// const Admin_PAYMENT_URL = `payment/payment-route`;
const CANDIDATE_PAYMENT_URL = `payment/payment`;
const CANDIDATE_MEMBERSHIP_PLANS_URL = `payment/premium/candidate`;


const paymentApiUrlConfig = {
    // Candidate
	createPaymentUrl: `${CANDIDATE_PAYMENT_URL}/create`,

	// Premium plans
	getAllMembershipPlansUrl: `${CANDIDATE_MEMBERSHIP_PLANS_URL}/plans`,
}

export default paymentApiUrlConfig
