import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ScamReport, User } from "../lib/types";

export const liveUpdateUser = (uid: string, callback: (doc: User) => void) => {
  const q = doc(db, "users", uid);
  if (!uid) {
    console.error("User ID is required for live updates.");
    return;
  }
  const observer = onSnapshot(
    q,
    async (querySnapshot) => {
      try {
        const data = querySnapshot.data();
        if (!data) {
          console.error("No data found for user:", uid);
          return;
        }
        const result: User = {
          id: querySnapshot.id,
          email: data.email || "",
          username: data.username || "Unknown",
          profilePicture: data.profilePicture || "",
          quizLevelCleared: data.quizLevelCleared || 0,
          notificationSettings: {
            scamTest: data.notificationSettings?.scamTest || false,
            email: data.notificationSettings?.email || false,
            sms: data.notificationSettings?.sms || false,
            phone: data.notificationSettings?.phone || false,
          },
          badgesObtained: data.badgesObtained || [],
        };

        callback(result);
      } catch (error) {
        console.error("Error processing live update for user:", error);
      }
    },
    async (err) => console.error("Error in live update userr:", err)
  );

  return observer;
};

export const liveUpdateUserReports = (
  uid: string = "",
  callback: (total: ScamReport[], verified: ScamReport[]) => void
) => {
  if (!uid || uid.trim() === "") {
    console.error("User ID is required for live updates.");
    throw new Error("User ID is required for live updates.");
  }
  const q = query(collection(db, "scamReports"), where("createdBy", "==", uid));
  const observer = onSnapshot(
    q,
    async (querySnapshot) => {
      try {
        const verified: ScamReport[] = [];
        const total: ScamReport[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const report: ScamReport = {
            id: doc.id,
            createdAt: data.createdAt.toDate(),
            scamReportType: data.scamReportType,
            scamReportStatus: data.scamReportStatus,
            votes: data.votes || [],
            replies: data.replies || [],
            content: data.content || "",
            title: data.title || "",
            images: data.images || [],
            createdBy: data.createdBy || "",
            location: data.location || "",
            updatedAt: data.updatedAt.toDate(),
            numOfReplies: 0,
            isEducation: data.isEducation || false,
            isDeleted: data.isDeleted || false,
          };
          total.push(report);
          if (report.scamReportStatus === "VALID") {
            verified.push(report);
          }
        });
        callback(total, verified);
      } catch (error) {
        console.error("Error processing live update for user posts:", error);
      }
    },
    async (err) => console.error("Error in live update user posts:", err)
  );

  return observer;
};

export async function getCurrentUserData(id: string): Promise<any | null> {
  const querySnapshot = await getDocs(collection(db, "users", id));
  console.log("calling api to get user data");
  console.log(querySnapshot);

  if (querySnapshot.empty) {
    return null;
  }
  const userData = querySnapshot.docs[0].data();
  userData.id = querySnapshot.docs[0].id;

  return userData;
}
export async function updateUserData(
  uid: string = "",
  data: Partial<User>
): Promise<User> {
  try {
    if (!uid || uid.trim() === "") {
      throw new Error("User ID is required to update user data.");
    }
    const userRef = doc(db, "users", uid);
    if (!userRef) {
      throw new Error(`User with ID ${uid} does not exist.`);
    }
    await updateDoc(userRef, data);
    return (await getDoc(userRef)).data() as User;
  } catch (error) {
    console.error("Error in updateUserData:", error);
    throw new Error("Failed to update user data.");
  }
}
