import { database } from '@/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<FirebaseFirestore.DocumentData>) => {
  if (req.method === 'GET') {
    const chatId = req.query.chatId;
    try {
      const chatRef = database.collection('chats');
      const chatDocument = chatRef.doc(chatId as string);
      const chatData = await chatDocument.get();
      if (chatData.exists) {
        return res.status(200).json({
          chats: chatData.data(),
        });
      } else {
        return res.status(404).json({
          error: 'Message not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving Message' });
    }
  }
};

export default handler;