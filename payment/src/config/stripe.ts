import Stripe from "stripe";


export const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY as string)