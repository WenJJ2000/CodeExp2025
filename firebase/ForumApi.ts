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
  limit,
  orderBy,
} from "firebase/firestore";
import { ScamReport, Notification } from "../lib/types";
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
        numOfReplies: data.numOfReplies || 0,
        replies: data.replies || [],
        content: data.content || "",
        title: data.title || "",
        images: data.images || [],
        createdBy: data.createdBy || "",
        location: data.location || "",
      };
    });
    for (const report of reports) {
      const reporterDoc = await getDoc(doc(db, "users", report.createdBy));
      if (reporterDoc.exists()) {
        report.createdBy = {
          id: reporterDoc.id,
          ...reporterDoc.data(),
        };
      } else {
        report.createdBy = {
          id: report.createdBy,
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
    return reports as ScamReport[];
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

      images: data.images || [],
      createdBy: data.createdBy || "",
      location: data.location || "",
    };
  });
  for (const report of reports) {
    const reporterDoc = await getDoc(doc(db, "users", report.createdBy));
    if (reporterDoc.exists()) {
      report.createdBy = {
        id: reporterDoc.id,
        ...reporterDoc.data(),
      };
    } else {
      report.createdBy = {
        id: report.createdBy,
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
  console.log("running LiveUpdate");
  const q = query(collection(db, "scamReports"), orderBy("createdAt", "desc"));
  const observer = onSnapshot(q, async (querySnapshot) => {
    const tempResult: any[] = [];
    const result: ScamReport[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const createdDate = new Date(Date.parse(data.createdAt.toDate()));
      const formattedCreatedDate = new Date(
        createdDate.setHours(createdDate.getHours())
      );
      const updatedDate = new Date(Date.parse(data.createdAt.toDate()));
      const formattedUpdatedDate = new Date(
        updatedDate.setHours(updatedDate.getHours())
      );
      tempResult.push({
        id: doc.id,
        createdAt: formattedCreatedDate,
        updatedAt: formattedUpdatedDate,
        scamReportType: data.scamReportType,
        scamReportStatus: data.scamReportStatus,
        votes: data.votes || [],
        replies: data.replies || [],
        numOfReplies: data.numOfReplies || 0,
        content: data.content || "",
        title: data.title || "",

        images: data.images || [],
        createdBy: data.createdBy || "",
        isEducation: data.isEducation || false,
        isDeleted: data.isDeleted || false,
        createdById: data.createdBy || "",
        location: data.location || "",
      });
    });
    for (const report of tempResult) {
      const reporterDoc = await getDoc(doc(db, "users", report.createdBy));

      if (reporterDoc.exists()) {
        result.push({
          ...report,
          createdBy: {
            id: reporterDoc.id,
            ...reporterDoc.data(),
          },
        });
      }
    }
    callback(result as ScamReport[]);
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
        const createdDate = new Date(Date.parse(data.createdAt.toDate()));
        const formattedCreatedDate = new Date(
          createdDate.setHours(createdDate.getHours())
        );
        const updatedDate = new Date(Date.parse(data.createdAt.toDate()));
        const formattedUpdatedDate = new Date(
          updatedDate.setHours(updatedDate.getHours())
        );
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
          createdAt: formattedCreatedDate,
          updatedAt: formattedUpdatedDate,
          scamReportType: data.scamReportType,
          scamReportStatus: data.scamReportStatus,
          votes: data.votes || [],
          replies: data.replies || [],
          content: data.content,
          title: data.title,
          images: data.images || [],
          createdBy: data.createdBy,
          location: data.location || "",
        };
        const reporterDoc = await getDoc(doc(db, "users", result.createdBy));
        if (reporterDoc.exists()) {
          result.createdBy = {
            ...reporterDoc.data(),
          };
        }

        callback(result);
      } catch (error) {
        console.error(
          "Error processing live update for a single scam report:",
          error
        );
      }
    },
    async (err) => console.error("Error in live update:", err)
  );

  return observer;
};

export const getLiveNotifications = (
  callback: (notifications: Notification[]) => void
) => {
  const changeMap: Record<string, string> = {
    added: "New",
    modified: "Updated",
    removed: "Removed",
  };
  const q = query(collection(db, "scamReports"), orderBy("createdAt", "desc"));
  const observer = onSnapshot(q, (snapshot) => {
    const x: Notification[] = snapshot.docChanges().map((change) => {
      const changeData = change.doc.data();
      const timestamp =
        change.type === "added" ? changeData.createdAt : changeData.updatedAt;
      const title = changeMap[change.type];
      return {
        id: change.doc.id,
        title: `${title} ${
          changeData.isEducation ? "Educational Post" : "Scam Report"
        } `,
        subtitle: changeData.title || changeData.content,
        timestamp: timestamp.toDate(),
        action: change.type,
      } as Notification;
    });
    callback(
      x.reduce((acc, curr) => {
        if (acc.length < 5) {
          acc.push(curr);
        }
        return acc;
      }, [] as Notification[])
    );
  });
  return observer;
};
