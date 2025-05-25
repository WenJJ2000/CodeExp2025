import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function register(email, password, username) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredential.user.uid;

  // Store extra user info in Firestore
  await setDoc(doc(db, 'users', uid), {
    profilePic: '',
    email,
    username,
    level: 1,
    badges: [],
    credibilityScore: 0,
    reportsMade: 0,
    level: 1,
  });
}
