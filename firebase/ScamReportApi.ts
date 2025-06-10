import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { db } from "./firebase";
import { emitNotification } from "./NotiApi";

export interface ScamReportInput {
  scamReportType: string;
  sender: string;
  title: string;
  content: string;
  location: { postalCode: string; latitude: number; longitude: number };
  createdBy: string;
  isEducation?: boolean;
  images?: string[];
}

export async function createReport({
  scamReportType,
  sender,
  title,
  content,
  location,
  createdBy,
  isEducation = false,
  images = [],
}: ScamReportInput) {
  const uuidValue = uuid.v4();

  const reportData = {
    createdBy: createdBy,
    scamReportType,
    title: sender,
    content: `${title ? `${title || "No title"}\n${content}` : content}`,
    location: location,
    numOfReplies: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    scamReportStatus: "INVALID",
    images,
    isEducation,
    isDeleted: false,
    votes: [],
    replies: [],
  };

  await setDoc(doc(db, "scamReports", uuidValue), reportData);
  const userDoc = await getDoc(doc(db, "users", createdBy));
  if (!userDoc.exists()) {
    throw new Error("User not found");
  }
  const username = userDoc.data()?.username || "Unknown User";
  await emitNotification("added", username, createdBy, uuidValue);
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
  userId: string,
  inputType: string,
  inputData: string,
  postedToForum: boolean
) {
  const uuidValue = uuid.v4();

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
