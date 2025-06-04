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
import { getReply } from "./ReplyApi";

export async function getScamReports() {
  try {
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
        numOfReplies:data.numOfReplies ||0,
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
  } catch (error) {
    console.error("Error fetching scam reports:", error);
  }
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
  console.log("running LiveUpdate")
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
        numOfReplies:data.numOfReplies || 0,
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
    // console.log("Live update result:", result);
    callback(result);
  });

  return observer;
};

export const liveUpdateOnASingleScamReport = (
  scamReportId: string,
  callback: (doc: ScamReport) => void
) => {

  const q = doc(db, "scamReports", scamReportId);
  const observer = onSnapshot(
    q,
    async (querySnapshot) => {
      try {
        const data = querySnapshot.data();
        if (!data) {
          console.error("No data found for scam report:", scamReportId);
          return;
        }
        const date = new Date(Date.parse(data.createdAt.toDate()));
        const formattedDate = new Date(date.setHours(date.getHours() + 8));
        for (const key in data.replies) {
          const reply = await getReply(data.replies[key]);
          if (reply) {
            data.replies[key] = reply;
          } else {
            console.error("Reply not found for ID:", data.replies[key]);
          }
        }
        const result: any = {
          id: querySnapshot.id,
          createdAt: formattedDate,
          scamReportType: data.scamReportType,
          scamReportStatus: data.scamReportStatus,
          votes: data.votes || [],
          replies: data.replies || [],
          content: data.content,
          title: data.title,
          image: data.image,
          reporter: data.reporter,
        };
        const reporterDoc = await getDoc(doc(db, "users", result.reporter));
        if (reporterDoc.exists()) {
          result.reporter = {
            ...reporterDoc.data(),
          };
        }

        // console.log(
        //   "Live update single scam report result:",
        //   JSON.stringify(result)
        // );
        callback(result);
      } catch (error) {
        console.error("Error processing live update for scam report:", error);
      }
    },
    async (err) => console.error("Error in live update:", err)
  );

  return observer;
};
