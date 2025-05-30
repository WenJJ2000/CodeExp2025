import { db } from "./firebase";
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
import { Vote, VoteType } from "../lib/types";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "~/lib/useContext/useAuthContext";
import { useId } from "react";

export async function vote(voteType: VoteType, postId: string) {
  const { uid: userId } = useAuth();
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  if (!voteType || !postId) {
    throw new Error("Vote type and post ID are required");
  }
  // Check if the user has already voted on this post
  const voteQuery = query(
    collection(db, "vote"),
    where("userId", "==", userId),
    where("postId", "==", postId)
  );
  const voteSnapshot = await getDocs(voteQuery);
  if (!voteSnapshot.empty) {
    // User has already voted on this post, update the existing vote
    const existingVoteDoc = voteSnapshot.docs[0];
    const existingVoteData = existingVoteDoc.data() as Vote;
    if (existingVoteData.type === voteType) {
      // If the vote type is the same, remove the vote
      await setDoc(doc(db, "vote", existingVoteDoc.id), {}, { merge: true });
      return; // Vote removed
    } else {
      // If the vote type is different, update it
      await setDoc(
        doc(db, "vote", existingVoteDoc.id),
        { voteType },
        { merge: true }
      );
      return; // Vote updated
    }
  } else {
    const uuid = uuidv4();
    const d = {
      userId,
      voteType,
      postId,
    };
    await setDoc(doc(db, "vote", uuid), d);
  }
}
