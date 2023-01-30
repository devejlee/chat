import { database } from '@/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<FirebaseFirestore.DocumentData>) => {
  if (req.method === 'GET') {
    const email = req.query.email;
    try {
      const chatRef = database.collection('userChats');
      const chatDocument = chatRef.doc(email as string);
      const chatData = await chatDocument.get();
      if (chatData.exists) {
        return res.status(200).json({
          userChats: chatData.data(),
        });
      } else {
        return res.status(404).json({
          error: 'Chat document not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving chat document' });
    }
  }
};

export default handler;