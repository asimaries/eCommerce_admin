import Stripe from "stripe";
export const runtime = 'experimental-edge'

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});