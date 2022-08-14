// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

require('dotenv').config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.log('Stripe Payment Intent Error', { error });
    res.status(400).send({ error });
  }
}
