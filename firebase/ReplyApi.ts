import { db } from "./firebase";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
export async function reply(
  userId: string,
  postId: string,
  content: string,
  image: string = "",
  isReply: boolean = false
) {
  console.log({ userId, postId, content, image, isReply });
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
