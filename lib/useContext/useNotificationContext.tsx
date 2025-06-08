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
import React from "react";

const NotificationContext = createContext<{
  setUser: (newUser: string | null) => void;
  setUid: (newUid: string | null) => void;
  user?: string | null;
  uid?: string | null;
}>({
  setUser: (newUser: string | null) => {
    console.warn("setUser function is not initialized");
  },
  setUid: (newUser: string | null) => {
    console.warn("setUid function is not initialized");
  },
  user: null,
  uid: null,
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = use(NotificationContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function NotificationProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<string | null>();
  const [uid, setUid] = useState<string | null>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user");
        const storedUid = await SecureStore.getItemAsync("uid");
        if (storedUser) {
          console.log("NotificationContext storedUser:", !!storedUser);
          setUser(storedUser);
        }
        if (storedUid) {
          console.log("NotificationContext storedUid:", !!storedUid);
          setUid(storedUid);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [user, uid]);
  const setuser = async (newUser: string | null) => {
    setUser(newUser);
    if (newUser) {
      try {
        await SecureStore.setItemAsync("user", newUser);
      } catch (error) {
        console.error("Error storing user:", error);
      }
    } else {
      await SecureStore.deleteItemAsync("user");
    }
  };
  const setuid = async (newUid: string | null) => {
    setUid(newUid);
    if (newUid) {
      try {
        await SecureStore.setItemAsync("uid", newUid);
      } catch (error) {
        console.error("Error storing UID:", error);
      }
    } else {
      await SecureStore.deleteItemAsync("uid");
    }
  };
  return (
    <NotificationContext
      value={{
        setUser: setuser,
        setUid: setuid,
        user,
        uid,
      }}
    >
      {children}
    </NotificationContext>
  );
}
