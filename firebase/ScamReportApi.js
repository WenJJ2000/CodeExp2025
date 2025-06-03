import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { db } from "./firebase";

export async function createReport({
  scamReportType,
  sender,
  title,
  content,
  reporter,
}) {
  const uuidValue = uuid.v4();

  const reportData = {
    reporter,
    scamReportType,
    // sender,
    title: sender,
    content: `${title ? `${title || "No title"}\n${content}` : content}`, // content is required
    // evidence: {
    //   type: 'text',
    //   url: '',
    // },
    createdAt: new Date(),
    scamReportStatus: "INVALID",
    votes: [],
    replies: [],
  };

  await setDoc(doc(db, "scamReports", uuidValue), reportData);
}

export async function getAllScamReports() {
  const uuidValue = uuid.v4();

  const querySnapshot = await getDocs(collection(db, "scamReports"));
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
    result: "pending",
    confidence: 0,
    timestamp: Date.now(),
    forumPostId: "", // optional — only if user posts it
    postedToForum,
  };
  await setDoc(doc(db, "scamChecks", uuidValue), d);
}
