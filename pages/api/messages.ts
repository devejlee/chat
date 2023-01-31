import { database } from '@/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<FirebaseFirestore.DocumentData>) => {
  res.setHeader('Content-Type', 'text/event-stream');
  if (req.method === 'GET') {
    const chatId = req.query.chatId;
    try {
      const chatRef = database.collection('chats').doc(chatId as string);
      const chatData = await chatRef.get();

      if (!chatData.exists) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      // send the initial data
      res.write(`data: ${JSON.stringify({ chats: chatData.data() })}\n\n`);

      // listen to updates and send to the connected client
      let unsubscribe: () => void;
      const sendMessage = (chatData: FirebaseFirestore.DocumentData) => {
        res.write(`data: ${JSON.stringify({ chats: chatData })}\n\n`);
      };
      unsubscribe = chatRef.onSnapshot((doc) => {
        if (doc.exists) {
          const chatData = doc.data() as FirebaseFirestore.DocumentData;
          sendMessage(chatData);
        }
      });

      // remove the listener when the client disconnects
      req.on('close', () => {
        unsubscribe();
      });

      res.statusCode = 200;
      res.end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving Chat' });
    }
  }
};

export default handler;