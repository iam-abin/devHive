import Stripe from 'stripe';
import { appConfig } from './appConfig';

export const stripeInstance: Stripe = new Stripe(appConfig.STRIPE_SECRET_KEY);
