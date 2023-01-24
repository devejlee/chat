
import * as admin from 'firebase-admin';

const PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY as string;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

export const database = admin.firestore();
{/* TODO: Integrate Firebase Registration */}
export const firebaseAuth = admin.auth();