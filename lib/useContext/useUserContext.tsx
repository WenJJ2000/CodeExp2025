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
  const { uid } = useAuth();
  useEffect(() => {
    console.log("UserProvider useEffect", uid);
    uid &&
      liveUpdateUser("JycJ3zEWtYa8Zn2qltqvFmYnZeH3", (doc: User) => {
        setUser(doc);
      });
  }, [uid]);
  return <UserContext value={{ user }}>{children}</UserContext>;
}
