import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '@/utils/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      await firebaseAuth.createUser({ 
        email: data.email,
        password: data.password,
        displayName: data.name
      });
      return res.status(201).json({
        message: 'User created successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'User already exists with this email' });
    }
  }
};

export default handler;