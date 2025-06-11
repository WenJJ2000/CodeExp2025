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
import { useAuth } from "./useAuthContext";
import { getNotifications } from "~/firebase/NotiApi";

const NotificationContext = createContext<{
  notifications: Notification[] | [];
}>({
  notifications: [],
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
  const { uid } = useAuth();
  useEffect(() => {
    const unsubscribe = getNotifications(
      uid,
      (notifications: Notification[]) => {
        setNotifications(notifications);
      }
    );
    return () => unsubscribe();
  }, [notifications, uid]);
  return (
    <NotificationContext
      value={{
        notifications,
      }}
    >
      {children}
    </NotificationContext>
  );
}
