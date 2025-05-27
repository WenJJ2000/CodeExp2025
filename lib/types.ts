export type ScamReportStatus = "VALID" | "INVALID";

export type ScamReportType =
  | "PHONE"
  | "SMS"
  | "Email"
  | "social_media"
  | "WEBSITE"
  | "MISINFORMATION"
  | "IN_PERSON"
  | "APP";

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
  name: string;
  profilePicture?: string;
  quizLevelCleared: number;
  notificationSettings: NotificationSetting;
  badgesObtained: Badge[];
  replies: Reply[];
};

export type Replyable = {
  id: string;
  content: string;
  createdAt: string;
  image?: string;
};
export type Vote = {
  id: string;
  voter: User;
  type: VoteType;
};

export type ScamReport = Replyable & {
  title: string;
  reporter: User;
  createdAt: string;
  scamReportType: ScamReportType;
  scamReportStatus: ScamReportStatus;
  votes: Vote[];
  replies: Reply[];
};

export type Reply = Replyable & {
  replyTo: Replyable;
  user: User;
};
