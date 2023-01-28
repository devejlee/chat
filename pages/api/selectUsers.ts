import { database } from '@/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === 'POST') {
    const { combinedId } = req.body;
    try {
      const chatRef = database.collection('chats');
      await chatRef.doc(combinedId).set({
        messages: []
      }, { merge: true });
      return res.status(200).json({
        message: 'Document created/updated successfully.',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating/updating the document.' });
    }
  }
};


export default handler;