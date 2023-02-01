import { DataPayload } from '@/typedef';
import { database } from '@/utils/firebase';
import { FieldValue } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<DataPayload>) => {
  if (req.method === 'POST') {
    const { selectedUser, currentUser, text } = req.body;
    const { randomUUID } = require('crypto');
    try {
      const chatRef = database.collection('chats');
      await chatRef.doc(`${currentUser.email}+${selectedUser.email}`).update({
        messages: FieldValue.arrayUnion({
          id: randomUUID(),
          text,
          senderId: currentUser.email,
          date: new Date()
        }),
      });
      await chatRef.doc(`${selectedUser.email}+${currentUser.email}`).update({
        messages: FieldValue.arrayUnion({
          id: randomUUID(),
          text,
          senderId: currentUser.email,
          date: new Date()
        }),
      });
      const userChatsRef = database.collection('userChats');
      await userChatsRef.doc(selectedUser.email).set({
        [`${currentUser.email}+${selectedUser.email}`]: {
          lastMessage: {
            text: text,
          },
          date: FieldValue.serverTimestamp()
        },
      }, { merge: true });
      await userChatsRef.doc(currentUser.email).set({
        [`${selectedUser.email}+${currentUser.email}`]: {
          lastMessage: {
            text: text,
          },
          date: FieldValue.serverTimestamp()
        },
      }, { merge: true });
      return res.status(200).json({
        message: 'Sent message updated successfully.',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error updating the sent message.' });
    }
  }
};


export default handler;