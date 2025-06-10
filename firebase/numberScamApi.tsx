import { db } from './firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';

export async function checkNumberScam(number: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'numberScam'),
      where('number', '==', number)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return false; // No scam found for this number
    }
    return true; // Scam found for this number
  } catch (error) {
    console.error('Error checking number scam:', error);
    throw new Error('Failed to check number scam');
  }
}

export async function addNumberScam(number: string, details: string) {
  try {
    const q = query(
      collection(db, 'numberScam'),
      where('number', '==', number)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // No scam found for this number
      const docRef = await addDoc(collection(db, 'numberScam'), {
        number,
        details,
        timestamp: new Date(),
      });
      return docRef.id;
    } else {
      return querySnapshot;
    }
    // Return the ID of the newly created document
  } catch (error) {
    console.error('Error adding number scam:', error);
    throw new Error('Failed to add number scam');
  }
}
