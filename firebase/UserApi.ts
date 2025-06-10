import { db } from "./firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Query,
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
