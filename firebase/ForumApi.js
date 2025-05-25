import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export async function createForumPost(authorId, title, content) {
  const uuid = uuidv4();
  const d = {
    authorId,
    title,
    content,
    votes: {},
    voteCount: 0,
    timestamp: Date.now(),
    comments: [],
  };

  await setDoc(doc(db, 'forum', uuid), d);
}

export async function createComments(authorId, content) {
  const uuid = uuidv4();
  const d = {
    postId: 'forumPost123', // links to forums/{postId}
    authorId,
    content,
    timestamp: Date.now(),
    votes: {},
    voteCount: 0,
    parentId: null, // for top-level comments
  };
  await setDoc(doc(db, 'comments', uuid), d);
}
