import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '@/utils/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;
    const test= await firebaseAuth.createUser({ 
      email: data.email,
      password: data.password,
      displayName: data.name
    });
    console.log('test', test);

    return res.status(200).json({
      test: 'hi',
    });
  }

  if (req.method === 'GET') {
    // return res.status(200).json({ total: count });
  }
};

export default handler;