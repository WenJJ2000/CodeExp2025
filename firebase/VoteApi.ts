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

export async function upvote(
  voter: string,
  voteType: VoteType,
  postId: string
) {
  const uuid = uuidv4();
  const d = {
    voter,
    voteType,
    postId,
  };

  await setDoc(doc(db, "forum", uuid), d);
}

// export async function createComments(authorId, content) {
//   const uuid = uuidv4();
//   const d = {
//     postId: "forumPost123", // links to forums/{postId}
//     authorId,
//     content,
//     timestamp: Date.now(),
//     votes: {},
//     voteCount: 0,
//     parentId: null, // for top-level comments
//   };
//   await setDoc(doc(db, "comments", uuid), d);
// }
