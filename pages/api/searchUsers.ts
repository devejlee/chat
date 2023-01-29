import { DataPayload, DataUser } from '@/typedef';
import { database } from '@/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<DataPayload>) => {
  if (req.method === 'POST') {
    const { name } = req.body;
    try {
      const usersRef = database.collection('users');
      const querySnapshot = await usersRef.where('name', '==', name).get();
      if (!querySnapshot.empty) {
        let userData: Array<DataUser> = [];
        querySnapshot.forEach(doc => {
          userData.push(doc.data() as DataUser);
        });
        return res.status(200).json({
          message: 'Users found',
          users: userData
        });
      } else {
        return res.status(404).json({
          message: 'Users not found'
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error searching users' });
    }
  }
};

export default handler;