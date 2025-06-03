import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
export async function reply(
  userId: string,
  postId: string,
  content: string,
  image: string = "",
  isReply: boolean = false
) {
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  if (!postId) {
    throw new Error("Post ID are required");
  }
  // Check if the user has already voted on this post
  let scamReportRef = doc(db, "scamReports", postId);
  if (isReply) {
    scamReportRef = doc(db, "replies", postId);
  }
  const report = await getDoc(scamReportRef);
  if (!report.exists()) {
    throw new Error("Scam report not found");
  }

  const reply = {
    content: content,
    user: userId,
    createdAt: new Date(),
    image: image,
  };

  const replyRef = await addDoc(collection(db, "replies"), reply);
  const replyid = replyRef.id;
  await setDoc(
    scamReportRef,
    {
      replies: [...(report.data()?.replies || []), replyid],
    },
    { merge: true }
  );
}
export async function getReply(id: string) {
  if (!id) {
    throw new Error("Reply ID is required");
  }
  console.log("Fetching reply with ID:", id);
  const replyRef = doc(db, "replies", id);
  const replyDoc = await getDoc(replyRef);
  if (!replyDoc.exists()) {
    throw new Error("Reply not found");
  }
  const userDoc = await getDoc(doc(db, "users", replyDoc.data().user));
  if (!userDoc.exists()) {
    throw new Error("User not found for the reply");
  }
  const userData = userDoc.data();
  if (!userData) {
    throw new Error("User data is empty");
  }
  if (replyDoc.data().replies && replyDoc.data().replies.length > 0) {
    const replies = await Promise.all(
      replyDoc
        .data()
        .replies.map(async (replyId: string) => await getReply(replyId))
    )
      .then((replies) => {
        // Filter out any undefined replies
        return replies.filter((reply) => reply !== undefined);
      })
      .then((replies) => {
        console.log("Replies fetched:", replies);
        return replies;
      });
    replyDoc.data().replies = replies;
  }

  return {
    id: replyDoc.id,
    ...replyDoc.data(),
    user: { id: userDoc.id, ...userData },
  };
}
