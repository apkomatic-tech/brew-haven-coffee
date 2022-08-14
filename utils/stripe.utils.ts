import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
console.log(stripePublicKey);
export const stripePromise = loadStripe(stripePublicKey!);
