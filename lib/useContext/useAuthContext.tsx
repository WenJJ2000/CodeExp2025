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
import { User } from "../types";
import { liveUpdateUser } from "~/firebase/UserApi";

const AuthContext = createContext<{
  setUser: (newUser: string) => void;
  setUid: (newUid: string) => void;
  user?: User | null;
  uid?: string;
}>({
  setUser: (newUser: string) => {
    console.warn("setUser function is not initialized");
  },
  setUid: (newUser: string) => {
    console.warn("setUid function is not initialized");
  },
  user: null,
  uid: "",
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>();
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user");
        const storedUid = await SecureStore.getItemAsync("uid");
        if (storedUser) {
          // console.log("AuthContext storedUser:", !!storedUser);
          setUser(JSON.parse(storedUser) as User);
        }
        if (storedUid) {
          // console.log("AuthContext storedUid:", !!storedUid);
          setUid(storedUid);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [user, uid]);
  useEffect(() => {
    uid &&
      liveUpdateUser(uid, (doc: User) => {
        setuser(JSON.stringify(doc));
      });
  }, [uid]);
  const setuser = async (newUser: string | null) => {
    setUser(JSON.parse(newUser || "null") as User | null);
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
  const setuid = async (newUid: string) => {
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
    <AuthContext
      value={{
        setUser: setuser,
        setUid: setuid,
        user,
        uid,
      }}
    >
      {children}
    </AuthContext>
  );
}
