import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function register(email, password, username) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredential.user.uid;

  // Store extra user info in Firestore
  await setDoc(doc(db, "users", uid), {
    profilePicture: "",
    email,
    username,
    level: 1,
    badges: [],
    credibilityScore: 0,
    reportsMade: 0,
    level: 1,
  });
}

export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return {
      id: userCredential.user.uid,
      ...userData,
    };
  }
  if (!userCredential.user) {
    throw new Error("Login failed");
  }
  return userCredential.user;
}
