import { Reply } from "~/lib/types";
import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { emitNotification } from "./NotiApi";
export async function reply(
  userId: string,
  postId: string,
  scamReportId: string,
  content: string,
  images: string[] = [],
  isReply: boolean = false
) {
  try {
    console.log(
      `Replying to postId: ${postId}, scamReportId: ${scamReportId}, userId: ${userId}, content: ${content}, images: ${images}, isReply: ${isReply}`
    );
    if (!userId) {
      throw new Error("User is not authenticated");
    }
    if (!postId) {
      throw new Error("Post ID are required");
    }
    const whereToAddReplieRef = doc(
      db,
      isReply ? "replies" : "scamReports",
      postId
    );
    const scamReportRef = doc(db, "scamReports", scamReportId);
    const whereToAdd = await getDoc(whereToAddReplieRef);
    const scamReport = await getDoc(scamReportRef);
    if (!whereToAdd.exists()) {
      throw new Error("Scam report or replies not found");
    }
    if (!scamReport.exists()) {
      throw new Error("Scam report not found");
    }

    const reply = {
      content: content,
      createdBy: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      replies: [],
      isDeleted: false,
      images: images,
    };

    const replyRef = await addDoc(collection(db, "replies"), reply);
    const replyid = replyRef.id;
    await setDoc(
      whereToAddReplieRef,
      {
        replies: [...(whereToAdd.data()?.replies || []), replyid],
      },
      { merge: true }
    );
    await setDoc(
      scamReportRef,
      {
        numOfReplies: scamReport.data()?.numOfReplies + 1 || 0,
      },
      { merge: true }
    );
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const username = userDoc.data()?.username || "Unknown User";
    if (!isReply) {
      if (userId !== scamReport.data()?.createdBy) {
        await emitNotification(
          "replied",
          username, // Placeholder for username, you can fetch it from user collection if needed
          userId,
          scamReportId,
          scamReport.data()?.createdBy || ""
        );
      }
    } else {
      await emitNotification(
        "repliedReply",
        username, // Placeholder for username, you can fetch it from user collection if needed
        userId,
        scamReportId,
        scamReport.data()?.createdBy || "",
        postId
      );
    }
  } catch (error) {
    console.error("Error in reply function:", error);
    throw new Error("Failed to reply to the post");
  }
}
export async function getReply(id: string) {
  if (!id) {
    throw new Error("Reply ID is required");
  }
  const replyRef = doc(db, "replies", id);
  const replyDoc = await getDoc(replyRef);
  if (!replyDoc.exists()) {
    throw new Error("Reply not found");
  }
  const returnReply = replyDoc.data();
  // populate user
  const userDoc = await getDoc(doc(db, "users", returnReply.createdBy));
  if (!userDoc.exists()) {
    throw new Error("User not found for the reply");
  }
  const userData = userDoc.data();
  if (!userData) {
    throw new Error("User data is empty");
  }
  // populate replies
  let repliess = [];
  if (replyDoc.data().replies && replyDoc.data().replies.length > 0) {
    for (const replyId of replyDoc.data().replies) {
      const reply: any = await getReply(replyId);
      repliess.push({
        ...reply,
      });
    }
  }
  const createdDate = new Date(Date.parse(returnReply.createdAt.toDate()));
  const formattedCreatedDate = new Date(
    createdDate.setHours(createdDate.getHours() + 8)
  );
  const updatedDate = new Date(Date.parse(returnReply.createdAt.toDate()));
  const formattedUpdatedDate = new Date(
    updatedDate.setHours(updatedDate.getHours() + 8)
  );
  return {
    id: replyDoc.id,
    createdAt: formattedCreatedDate || new Date(),
    updatedAt: formattedUpdatedDate || new Date(),
    content: returnReply.content || "",
    images: returnReply.images || [],
    replies: repliess || [],
    createdBy: { id: userDoc.id, ...userData },
  } as Reply;
}
