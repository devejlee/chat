import type { NextApiRequest, NextApiResponse } from 'next';
import { database, firebaseAuth } from '@/utils/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const newUser = {
        email: data.email,
        password: data.password,
        displayName: data.name
      };
      const userRef = database.collection('users');
      const userSnapshot = await userRef.where('email', '==', data.email).get();
      if (userSnapshot.empty) {
        await firebaseAuth.createUser(newUser);
        await userRef.add(newUser);
        return res.status(201).json({
          message: 'User created successfully',
        });
      }
      else {
        return res.status(500).json({ error: 'User already exists with this email' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating user' });
    }
  }
};

export default handler;