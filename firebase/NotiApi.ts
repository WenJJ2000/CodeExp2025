import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { Notification } from "../lib/types";

// Type for Notification
// export type NotificationType = {
//   id: string;
//   title: string;
//   subtitle: string;
//   detail?: string;
//   linkText?: string;
//   timestamp: Timestamp;
//   link?: string;
// };

// Real-time subscription for notifications
export const getNotifications = (
  onUpdate: (notifications: Notification[]) => void
) => {
  const q = query(
    collection(db, "notifications"),
    orderBy("timestamp", "desc")
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      subtitle: doc.data().subtitle,
      timestamp: doc.data().timestamp.toDate(),
      action: doc.data().action,
      readBy: doc.data().readBy || [],
      scamReportId: doc.data().scamReportId,
      createdBy: doc.data().createdBy,
    })) as Notification[];
    onUpdate(data);
  });
  return unsubscribe;
};

// Fetch ONCE (not realtime)
export const fetchNotificationsOnce = async (): Promise<Notification[]> => {
  const q = query(
    collection(db, "notifications"),
    orderBy("timestamp", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Notification[];
};

// Optionally: add a function to create notifications
// export async function addNotification(
//   notification: Omit<NotificationType, "id">
// ) {
//   const ref = doc(collection(db, "notifications"));
//   await setDoc(ref, notification);
// }

export const emitNotification = async (
  action:
    | "added"
    | "modified"
    | "removed"
    | "upvoted"
    | "downvoted"
    | "replied",
  username: string,
  createdBy: string,
  scamReportId: string,
  onlyFor?: string,
  replyId?: string
) => {
  const timestamp = new Date();
  const title = titleMap[action];
  const subtitle = `${username} has ${action} a scam report.`;

  const notification = {
    title,
    subtitle,
    timestamp,
    action: action,
    readBy: [createdBy],
    scamReportId: scamReportId,
    createdBy: createdBy,
  } as Notification;
  if (replyId) {
    notification.replyId = replyId;
  }
  if (action === "replied" || action === "upvoted" || action === "downvoted") {
    notification.subtitle = `${username} has ${action} your scam report.`;
    notification.onlyFor = onlyFor;
  }
  await addDoc(collection(db, "notifications"), notification);
};

const titleMap: Record<string, string> = {
  added: "New Post",
  modified: "Post Updated",
  removed: "Post Removed",
  upVoted: "Post Updated",
  downVoted: "Post Updated",
  replied: "Post Updated",
};
