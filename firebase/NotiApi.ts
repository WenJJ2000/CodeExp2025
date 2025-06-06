import { collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

// Type for Notification
export type NotificationType = {
    id: string;
    title: string;
    subtitle: string;
    detail?: string;
    linkText?: string;
    timestamp: Timestamp;
    link?: string;
};

// Real-time subscription for notifications
export const getNotifications = (onUpdate: (notifications: NotificationType[]) => void) => {
    const q = query(collection(db, "notifications"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as NotificationType[];
        onUpdate(data);
    });
    return unsubscribe;
};

// Fetch ONCE (not realtime)
export const fetchNotificationsOnce = async (): Promise<NotificationType[]> => {
    const q = query(collection(db, "notifications"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as NotificationType[];
};

// Optionally: add a function to create notifications
export async function addNotification(notification: Omit<NotificationType, 'id'>) {
    const ref = doc(collection(db, "notifications"));
    await setDoc(ref, notification);
}
