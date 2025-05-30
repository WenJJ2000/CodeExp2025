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
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { Vote, VoteType } from "../lib/types";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "~/lib/useContext/useAuthContext";
import { useId } from "react";

export async function vote(userId: string, voteType: VoteType, postId: string) {
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  if (!voteType || !postId) {
    throw new Error("Vote type and post ID are required");
  }
  // Check if the user has already voted on this post
  const voteQuery = query(
    collection(db, "votes"),
    where("voter", "==", userId),
    where("scamReportId", "==", postId)
  );
  const scamReportRef = doc(db, "scamReports", postId);
  const voteSnapshot = await getDocs(voteQuery);
  const scamReport = await getDoc(scamReportRef);
  if (!scamReport) {
    throw new Error("Scam report not found");
  }
  if (!voteSnapshot.empty) {
    // User has already voted on this post, update the existing vote
    const existingVoteDoc = voteSnapshot.docs[0];
    const existingVoteData = existingVoteDoc.data() as Vote;
    if (existingVoteData.type === voteType) {
      // If the vote type is the same, remove the vote
      await deleteDoc(doc(db, "votes", existingVoteDoc.id));
      await setDoc(
        scamReportRef,
        {
          votes: scamReport
            .data()
            ?.votes.filter((vote: string) => vote !== existingVoteDoc.id),
        },
        { merge: true }
      );
      return; // Vote removed
    } else {
      // If the vote type is different, update it
      await setDoc(
        doc(db, "votes", existingVoteDoc.id),
        { type: voteType },
        { merge: true }
      );
      await setDoc(
        scamReportRef,
        {
          votes: scamReport
            .data()
            ?.votes.filter((vote: string) => vote !== existingVoteDoc.id),
        },
        { merge: true }
      );
      await setDoc(
        scamReportRef,
        {
          votes: [...(scamReport.data()?.votes || [])],
        },
        { merge: true }
      );
      return; // Vote updated
    }
  } else {
    // const uuid = uuidv4();

    const d = {
      voter: userId,
      type: voteType,
      scamReportId: postId,
    };
    const vote = await addDoc(collection(db, "votes"), d);
    await setDoc(
      scamReportRef,
      {
        votes: [...(scamReport.data()?.votes || []), vote.id],
      },
      { merge: true }
    );
  }
}
