import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export async function getCurrentUserData(id: string): Promise<any | null> {
  const querySnapshot = await getDocs(collection(db, 'users', id));
  console.log('calling api to get user data');
  console.log(querySnapshot);

  if (querySnapshot.empty) {
    return null;
  }
  const userData = querySnapshot.docs[0].data();
  userData.id = querySnapshot.docs[0].id;

  return userData;
}
