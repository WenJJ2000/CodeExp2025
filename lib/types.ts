export type ScamReportStatus = "VALID" | "INVALID";

export type ScamReportType =
  | "PHONE"
  | "SMS"
  | "EMAIL"
  | "SOCIAL_MEDIA"
  | "WEBSITE"
  // | "MISINFORMATION"
  | "IN_PERSON"
  | "APP";
export const scamReportTypes: { value: ScamReportType; label: string }[] = [
  { value: "SMS", label: "SMS" },
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Phone" },
  { value: "SOCIAL_MEDIA", label: "Social Media" },
  { value: "WEBSITE", label: "Website" },
  { value: "IN_PERSON", label: "In Person" },
  { value: "APP", label: "App" },
];
export type ForumTagVariant =
  | "PHONE"
  | "SMS"
  | "EMAIL"
  | "SOCIAL_MEDIA"
  | "WEBSITE"
  // | "MISINFORMATION"
  | "IN_PERSON"
  | "APP"
  | "VERIFIED"
  | "EDUCATION";
export type VoteType = "UPVOTE" | "DOWNVOTE";
export type NotificationSetting = {
  id: string;
  scamTest: boolean;
  email: boolean;
  sms: boolean;
  phone: boolean;
};
export type Notification = {
  id: string;
  title: string;
  subtitle: string;
  timestamp: Date;
};
export type QuizOption = {
  id: string;
  text: string;
};
export type Badge = {
  id: string;
  title: string;
  image: string;
};
export type QuizQuestion = {
  id: string;
  text: string;
  options: QuizOption[];
  answers: QuizOption[];
  level: number;
  image?: string;
  achievableBadege: Badge;
};
export type User = {
  id: string;
  email: string;
  username: string;
  profilePicture?: string;
  quizLevelCleared: number;
  notificationSettings: NotificationSetting;
  badgesObtained: Badge[];
};

export type ScamReport = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  title: string;
  createdBy: User;
  numOfReplies: number;
  scamReportType: ScamReportType;
  isEducation: boolean;
  isDeleted: boolean;
  scamReportStatus: ScamReportStatus;
  votes: { type: VoteType; voterId: string }[];
  replies: Reply[];
  location?: string;
};

export type Reply = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  image?: string;
  replies?: Reply[];
  createdBy: User;
};
