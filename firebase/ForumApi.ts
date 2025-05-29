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
import { ScamReport } from "../lib/types";

export async function getScamReports() {
  const querySnapshot = await getDocs(collection(db, "scamReports"));
  const reports = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const date = new Date(Date.parse(data.createdAt.toDate()));
    const formattedDate = new Date(date.setHours(date.getHours() + 8));
    return {
      id: doc.id,
      createdAt: formattedDate,
      scamReportType: data.scamReportType || "UNKNOWN",
      scamReportStatus: data.scamReportStatus || "PENDING",
      votes: data.votes || [],
      replies: data.replies || [],
      content: data.content || "",
      title: data.title || "",
      image: data.image || "",
      reporter: data.reporter || "",
    };
  });
  for (const report of reports) {
    const reporterDoc = await getDoc(doc(db, "users", report.reporter));
    if (reporterDoc.exists()) {
      report.reporter = {
        id: reporterDoc.id,
        ...reporterDoc.data(),
      };
    } else {
      report.reporter = {
        id: report.reporter,
        email: "",
        username: "Unknown",
        profilePicture: "",
        quizLevelCleared: 0,
        notificationSettings: {
          id: "",
          scamTest: false,
          email: false,
          sms: false,
          phone: false,
        },
        badgesObtained: [],
        replies: [],
      };
    }
  }
  return reports;
}
export async function getAScamReport(id: string) {
  const querySnapshot = await getDocs(collection(db, "scamReports", id));
  const reports = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const date = new Date(Date.parse(data.createdAt.toDate()));
    const formattedDate = new Date(date.setHours(date.getHours() + 8));
    return {
      id: doc.id,
      createdAt: formattedDate,
      scamReportType: data.scamReportType || "UNKNOWN",
      scamReportStatus: data.scamReportStatus || "PENDING",
      votes: data.votes || [],
      replies: data.replies || [],
      content: data.content || "",
      title: data.title || "",
      image: data.image || "",
      reporter: data.reporter || "",
    };
  });
  for (const report of reports) {
    const reporterDoc = await getDoc(doc(db, "users", report.reporter));
    if (reporterDoc.exists()) {
      report.reporter = {
        id: reporterDoc.id,
        ...reporterDoc.data(),
      };
    } else {
      report.reporter = {
        id: report.reporter,
        email: "",
        username: "Unknown",
        profilePicture: "",
        quizLevelCleared: 0,
        notificationSettings: {
          id: "",
          scamTest: false,
          email: false,
          sms: false,
          phone: false,
        },
        badgesObtained: [],
        replies: [],
      };
    }
  }
  return reports[0] || null;
}
export const liveUpdate = (callback: (doc: ScamReport[]) => void) => {
  const q = query(collection(db, "scamReports"));
  const observer = onSnapshot(q, async (querySnapshot) => {
    const tempResult: any[] = [];
    const result: ScamReport[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const date = new Date(Date.parse(data.createdAt.toDate()));
      const formattedDate = new Date(date.setHours(date.getHours() + 8));
      tempResult.push({
        id: doc.id,
        createdAt: formattedDate,
        scamReportType: data.scamReportType,
        scamReportStatus: data.scamReportStatus,
        votes: data.votes || [],
        replies: data.replies || [],
        content: data.content || "",
        title: data.title || "",
        image: data.image || "",
        reporter: data.reporter || "",
      });
    });
    for (const report of tempResult) {
      const reporterDoc = await getDoc(doc(db, "users", report.reporter));
      if (reporterDoc.exists()) {
        result.push({
          ...report,
          reporter: {
            id: reporterDoc.id,
            ...reporterDoc.data(),
          },
        });
      }
    }
    callback(result);
  });

  return observer;
};

// export async function createForumPost(authorId, title, content) {
//   const uuid = uuidv4();
//   const d = {
//     authorId,
//     title,
//     content,
//     votes: {},
//     voteCount: 0,
//     timestamp: Date.now(),
//     comments: [],
//   };

//   await setDoc(doc(db, "forum", uuid), d);
// }

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
