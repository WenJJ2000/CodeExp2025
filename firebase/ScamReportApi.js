import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { db } from "./firebase";

export async function createReport({
  scamReportType,
  sender,
  title,
  content,
  location,
  createdBy,
  isEducation = false,
  image = "",
}) {
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
    image: image || "",
    isEducation,
    isDeleted: false,
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
