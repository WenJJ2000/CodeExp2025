import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function createQuizLevel(authorId, title, content) {
  const uuid = uuidv4();
  const d = {
    authorId,
    title,
    content,
    votes: {},
    voteCount: 0,
    timestamp: Date.now(),
    comments: [],
  };

  await setDoc(doc(db, 'forum', uuid), d);
}
