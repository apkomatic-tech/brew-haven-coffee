// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ORDER_SERVICE_FEE } from '../../config/cart.config';
import { OrderItem } from '../../types/OrderItem';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

require('dotenv').config();

function calculateOrderAmount(items: OrderItem[]) {
  console.log(items);

  const amount = items.reduce((total, item) => {
    if (item.quantity === 1) {
      total += item.price;
    } else {
      total += item.price * item.quantity;
    }
    return total;
  }, 0);
  const result = amount + amount * ORDER_SERVICE_FEE;
  // convert to cents for stripe
  return Number((result * 100).toFixed(0));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { items } = req.body;

    if (!items.length) {
      return res.status(200).send({
        clientSecret: ''
      });
    }

    const orderAmount = calculateOrderAmount(items);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
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
