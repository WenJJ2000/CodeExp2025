import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import uuid from 'react-native-uuid';
import { db } from './firebase';



export async function createReport({ scamType, sender, title, content, reporterId }) {
  const uuidValue = uuid.v4();
  
  const reportData = {
    reporterId,
    scamType,
    sender,
    title: title || null, // optional
    content,
    // evidence: {
    //   type: 'text',
    //   url: '',
    // },
    timestamp: new Date().toLocaleDateString(),
    status: 'pending',
    votes: [0, 0],
    comments: [],
  };

  await setDoc(doc(db, 'scamReports', uuidValue), reportData);
}

export async function getAllScamReports() {
  const uuidValue = uuid.v4();
  
  const querySnapshot = await getDocs(collection(db, 'scamReports'));
  const reports = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return reports;
}

export async function createScamCheck(
  userId,
  inputType,
  inputData,
  postedToForum
) {
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
  await setDoc(doc(db, 'scamChecks', uuidValue), d);
}
