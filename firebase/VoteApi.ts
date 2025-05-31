import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { VoteType } from "../lib/types";

export async function vote(userId: string, voteType: VoteType, postId: string) {
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  if (!voteType || !postId) {
    throw new Error("Vote type and post ID are required");
  }
  // Check if the user has already voted on this post

  const scamReportRef = doc(db, "scamReports", postId);
  const scamReport = await getDoc(scamReportRef);
  if (!scamReport) {
    throw new Error("Scam report not found");
  }
  const votes = scamReport.data()?.votes || [];
  // Check if the user has already voted
  const existingVoteIndex = votes.findIndex(
    (vote: any) => vote.voterId === userId
  );
  if (existingVoteIndex !== -1) {
    // User has already voted, update the vote type
    if (votes[existingVoteIndex].type === voteType) {
      // If the user is trying to vote the same type, do nothing
      votes.splice(existingVoteIndex, 1); // Remove the vote
    } else {
      // If the user is changing their vote type, update it
      votes[existingVoteIndex].type = voteType;
    }
  } else {
    // User has not voted yet, add a new vote
    votes.push({ type: voteType, voterId: userId });
  }
  // Update the scam report with the new votes array
  await setDoc(scamReportRef, { votes }, { merge: true });
}
