import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import * as SecureStore from "expo-secure-store";
import { Notification } from "~/lib/types"; // Adjust the import path as necessary

const NotificationContext = createContext<{
  notifications: Notification[] | null;
  setNotifications: (newNotifications: Notification[]) => Promise<void> | void;
}>({
  notifications: null,
  setNotifications: () => {},
});

// This hook can be used to access the user info.
export function useNotification() {
  const value = use(NotificationContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function NotificationProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const storedNotifications = await SecureStore.getItemAsync(
          "notifications"
        );
        if (storedNotifications) {
          const parsedNotifications = JSON.parse(
            storedNotifications
          ) as Notification[];

          setNotifications(
            parsedNotifications.map((notification) => ({
              ...notification,
              timestamp: new Date(notification.timestamp),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };
    fetchNotificationData();
  }, [notifications]);
  const setNotificationsLocal = async (
    newNotifications: Notification[] = []
  ) => {
    const storedNotifications = await SecureStore.getItemAsync("notifications");
    let parsedNotifications = [] as Notification[]; // Initialize as an empty array
    if (storedNotifications) {
      parsedNotifications = JSON.parse(storedNotifications) as Notification[];
    }
    const newParsedNotifications = parsedNotifications.map((notification) => ({
      ...notification,
      timestamp: new Date(notification.timestamp),
    }));
    const mergedNotifications = [
      ...newNotifications,
      ...newParsedNotifications,
    ].filter(
      (notification, index, self) =>
        index === self.findIndex((n) => n.id === notification.id)
    );
    setNotifications(mergedNotifications);

    if (mergedNotifications.length > 0) {
      try {
        await SecureStore.setItemAsync(
          "notifications",
          JSON.stringify(mergedNotifications)
        );
      } catch (error) {
        console.error("Error storing notifications:", error);
      }
    }
  };
  return (
    <NotificationContext
      value={{
        notifications,
        setNotifications: setNotificationsLocal,
      }}
    >
      {children}
    </NotificationContext>
  );
}
