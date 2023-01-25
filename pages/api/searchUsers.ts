import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@/utils/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name } = req.body;
    try {
      const usersRef = database.collection('users');
      const querySnapshot = await usersRef.where('name', '==', name).get();
      if (!querySnapshot.empty) {
        let userData = {};
        querySnapshot.forEach(doc => {
          userData = { ...doc.data() };
        });
        return res.status(200).json({
          message: 'User found',
          user: userData
        });
      } else {
        return res.status(404).json({
          message: 'User not found'
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error searching user' });
    }
  }
};

export default handler;