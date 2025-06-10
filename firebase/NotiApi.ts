import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
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
  uid: string = "",
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
      replyId: doc.data().replyId,
      onlyFor: doc.data().onlyFor, // Optional field for user-specific notifications
    })) as Notification[];
    const result = data.filter((noti) => {
      // If uid is provided, filter notifications for that user
      if (uid) {
        if (noti.onlyFor && noti.onlyFor !== uid) {
          return false; // Skip notifications not meant for this user
        }
        if (noti.readBy.includes(uid)) {
          return false; // Skip notifications already read by this user
        }
      }
      // Otherwise, return all notifications
      return true;
    });
    onUpdate(result);
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
    | "replied"
    | "repliedReply",
  username: string,
  createdBy: string,
  scamReportId: string,
  onlyFor?: string,
  replyId?: string
) => {
  const timestamp = new Date();
  const title = titleMap[action];
  const subtitle = `${username} has ${action} a scam report.`;
  if (!title) {
    throw new Error(`Invalid action type: ${action}`);
  }
  if (!scamReportId) {
    throw new Error("Scam report ID is required for notifications");
  }
  if (!createdBy) {
    throw new Error("Created by user ID is required for notifications");
  }
  if (action === "removed" && !replyId) {
    throw new Error("Reply ID is required for removed action notifications");
  }
  if (action === "upvoted" || action === "downvoted") {
    if (!onlyFor) {
      throw new Error(
        "OnlyFor user ID is required for upvote/downvote notifications"
      );
    }
  }

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
  if (action === "repliedReply") {
    notification.subtitle = `${username} has replied to your reply.`;
    notification.onlyFor = onlyFor;
  }
  await addDoc(collection(db, "notifications"), notification);
};

const titleMap: Record<string, string> = {
  added: "New Post",
  modified: "Post Updated",
  removed: "Post Removed",
  upvoted: "Post Updated",
  downvoted: "Post Updated",
  replied: "Post Updated",
  repliedReply: "Reply Updated",
};
export const viewNotification = async (
  userId: string = "",
  scamReportId: string
) => {
  if (!scamReportId || !userId) {
    throw new Error("scamReportId  and User ID are required");
  }
  const notificationRef = query(
    collection(db, "notifications"),
    where("scamReportId", "==", scamReportId)
  );
  const notificationDocs = await getDocs(notificationRef);
  const notificationData = notificationDocs.docs.map((x) => x);
  if (notificationData.length === 0) {
    console.warn("No notifications found for this scam report ID");
    return;
  }
  // Add userId to readBy array if not already present
  for (const notification of notificationData) {
    if (!notification.data().readBy.includes(userId)) {
      await setDoc(
        notification.ref,
        { readBy: [...notification.data().readBy, userId] },
        { merge: true }
      );
    }
  }
};
