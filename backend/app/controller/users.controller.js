import { db } from "..firebase/firebase";
import {
  doc,
  setDoc,
  getDoc,
  where,
  query,
  collection,
  getDocs,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

const liveUpdate = (callback) => {
  console.log("running LiveUpdate");
  const q = query(collection(db, "scamReports"));
  const observer = onSnapshot(q, async (querySnapshot) => {
    callback(result);
  });

  return observer;
};

module.exports = { liveUpdate };
