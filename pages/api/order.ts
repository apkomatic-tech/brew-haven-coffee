// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  isSuccess: boolean;
  errors?: any[];
  result?: any;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { items, total } = req.body;

    if (!items?.length || !total) {
      res.status(400).json({
        isSuccess: false,
        errors: ['Missing parameters']
      });
      res.end();
      return;
    }

    res.status(200).json({ isSuccess: true, result: { data: req.body, message: 'success!' } });
    res.end();
  } else {
    console.error('Invalid order request');
    res.status(400).json({
      isSuccess: false,
      errors: ['Invalid request method provided.']
    });
    res.end();
  }
}
