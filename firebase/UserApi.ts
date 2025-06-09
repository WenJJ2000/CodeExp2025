import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { User } from "../lib/types";

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
