import { database } from '@/utils/firebase';
import { FieldValue } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string 
  error?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { selectedUser, currentUser } = req.body;
    try {
      const chatRef = database.collection('chats');
      await chatRef.doc(`${currentUser.email}+${selectedUser.email}`).set({
        messages: []
      }, { merge: true });
      const userChatsRef = database.collection('userChats');
      await userChatsRef.doc(selectedUser.email).set({
        [`${currentUser.email}+${selectedUser.email}`]: {
          'userInfo': {
            email: selectedUser.email,
            name: selectedUser.name
          },
          'date': FieldValue.serverTimestamp()
        },
      }, { merge: true });
      await userChatsRef.doc(currentUser.email).set({
        [`${selectedUser.email}+${currentUser.email}`]: {
          'userInfo': {
            email: currentUser.email,
            name: currentUser.name
          },
          'date': FieldValue.serverTimestamp()
        },
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