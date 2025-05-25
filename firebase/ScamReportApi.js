import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export async function createReport(description, reporterId, scamType) {
  const uuid = uuidv4();
  // Store extra user info in Firestore
  await setDoc(doc(db, 'scamReports', uuid), {
    comments: [],
    description,
    reporterId,
    scamType,
    evidence: {
      type: 'image/text',
      url: '',
    },
    timestamp: Date.now(),
    status: 'pending',
    votes: [0, 0], // [upvotes,downvotes]
  });
}

export async function createScamCheck(
  userId,
  inputType,
  inputData,
  postedToForum
) {
  const uuid = uuidv4();
  const d = {
    userId,
    inputType,
    inputData,
    result: 'pending',
    confidence: 0,
    timestamp: Date.now(),
    forumPostId: '', // optional — only if user posts it
    postedToForum,
  };
  await setDoc(doc(db, 'scamChecks', uuid), d);
}
