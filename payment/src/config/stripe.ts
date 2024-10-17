import Stripe from "stripe";
import { config } from "./appConfig";


export const stripeInstance: Stripe = new Stripe(config.STRIPE_SECRET_KEY as string)