import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { VoteType } from "../lib/types";
import { emitNotification } from "./NotiApi";

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
  const voteExistsnUnchanged =
    existingVoteIndex !== -1 && votes[existingVoteIndex].type === voteType;
  if (existingVoteIndex !== -1) {
    // User has already voted, update the vote type
    if (votes[existingVoteIndex].type === voteType) {
      // If the user is trying to vote the same type, Remove the vote
      votes.splice(existingVoteIndex, 1);
    } else {
      // If the user is changing their vote type, update it
      votes[existingVoteIndex].type = voteType;
    }
  } else {
    // User has not voted yet, add a new vote
    votes.push({ type: voteType, voterId: userId });
  }
  // Update the scam report with the new votes array
  await setDoc(
    scamReportRef,
    { votes, updatedAt: new Date() },
    { merge: true }
  );

  if (!voteExistsnUnchanged) {
    console.log(
      `User ${userId} has ${
        voteType === "UPVOTE" ? "upvoted" : "downvoted"
      } the scam report ${postId}`
    );
    const action = voteType === "UPVOTE" ? "upvoted" : "downvoted";
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const username = userDoc.data()?.username || "Unknown User";
    const createdBy = scamReport.data()?.createdBy || "Unknown Creator";
    const scamReportId = scamReport.id;
    // Emit notification for the vote action
    await emitNotification(action, username, userId, scamReportId, createdBy);
  }
}
