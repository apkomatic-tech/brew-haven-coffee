// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  isSuccess: boolean;
  errors?: any[];
  result?: any;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    res.status(200).json({
      isSuccess: true,
      result: []
    });
  }
  if (req.method === 'POST') {
    const { quantity, productid } = req.body;

    if (!quantity || !productid) {
      res.status(400).json({
        isSuccess: false,
        errors: ['Missing parameters']
      });
      res.end();
      return;
    }

    res.status(200).json({ isSuccess: true, result: { message: 'success!' } });
    res.end();
  } else {
    console.error('Invalid request method. Aborting...');
    res.status(400).json({
      isSuccess: false,
      errors: ['Invalid request method.']
    });
    res.end();
  }
}
