export type ScamReportStatus = "VALID" | "INVALID";

export type ScamReportType =
  | "PHONE"
  | "SMS"
  | "EMAIL"
  | "SOCIAL_MEDIA"
  | "WEBSITE"
  | "MISINFORMATION"
  | "IN_PERSON"
  | "APP";
export type ForumTagVariant =
  | "PHONE"
  | "SMS"
  | "EMAIL"
  | "SOCIAL_MEDIA"
  | "WEBSITE"
  | "MISINFORMATION"
  | "IN_PERSON"
  | "APP"
  | "VERIFIED";
export type VoteType = "UPVOTE" | "DOWNVOTE";
export type NotificationSetting = {
  id: string;
  scamTest: boolean;
  email: boolean;
  sms: boolean;
  phone: boolean;
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
  image?: string;
  title: string;
  reporter: User;
  scamReportType: ScamReportType;
  scamReportStatus: ScamReportStatus;
  votes: { type: VoteType; voterId: string }[];
  replies: Reply[];
};

export type Reply = {
  id: string;
  content: string;
  createdAt: Date;

  image?: string;
  replies?: Reply[];
  user: User;
};
