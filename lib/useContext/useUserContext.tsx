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
import { useAuth } from "./useAuthContext";

const UserContext = createContext<{
  user?: User | null;
}>({ user: null });

// This hook can be used to access the user info.
export function useUser() {
  const value = use(UserContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState("");
  const fetchUid = async () => {
    const storedUid = await SecureStore.getItemAsync("uid");
    if (storedUid) {
      setUid(storedUid);
      setIsLoading(false);
    } else {
      console.error("No UID found in SecureStore");
    }
  };
  useEffect(() => {
    !isLoading && fetchUid();
    uid &&
      liveUpdateUser(uid, (doc: User) => {
        setUser(doc);
      });
  }, [uid, isLoading, user]);
  return <UserContext value={{ user }}>{children}</UserContext>;
}
