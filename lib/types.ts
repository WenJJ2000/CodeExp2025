export type ScamReportStatus = 'VALID' | 'INVALID';

export type ScamReportType =
  | 'PHONE'
  | 'SMS'
  | 'EMAIL'
  | 'SOCIAL_MEDIA'
  | 'WEBSITE'
  // | "MISINFORMATION"
  | 'IN_PERSON'
  | 'APP'
  | 'CRYPTO';
export const scamReportTypes: {
  value: ScamReportType;
  label: string;
}[] = [
  { value: 'SMS', label: 'SMS' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'PHONE', label: 'Phone' },
  { value: 'SOCIAL_MEDIA', label: 'Social Media' },
  { value: 'WEBSITE', label: 'Website' },
  { value: 'IN_PERSON', label: 'In Person' },
  { value: 'APP', label: 'App' },
  // { value: "MISINFORMATION", label: "Misinformation" },
];
export type Filters =
  | 'All'
  | 'SMS'
  | 'EMAIL'
  | 'PHONE'
  | 'SOCIAL_MEDIA'
  | 'WEBSITE'
  | 'IN_PERSON'
  | 'APP'
  | 'EDUCATION'
  | 'VERIFIED';
export const ScamReportFilterTypes: {
  value: Filters;
  label: string;
}[] = [
  { value: 'All', label: 'All' },
  { value: 'SMS', label: 'SMS' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'PHONE', label: 'Phone' },
  { value: 'SOCIAL_MEDIA', label: 'Social Media' },
  { value: 'WEBSITE', label: 'Website' },
  { value: 'IN_PERSON', label: 'In Person' },
  { value: 'APP', label: 'App' },
  { value: 'CRYPTO', label: 'Crypto' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'VERIFIED', label: 'Verified' },
];
export type ForumTagVariant =
  | 'PHONE'
  | 'SMS'
  | 'EMAIL'
  | 'SOCIAL_MEDIA'
  | 'WEBSITE'
  // | "MISINFORMATION"
  | 'IN_PERSON'
  | 'APP'
  | 'VERIFIED'
  | 'EDUCATION'
  | 'CRYPTO';
export type VoteType = 'UPVOTE' | 'DOWNVOTE';
export type Notification = {
  id: string;
  title: string;
  subtitle: string;
  timestamp: Date;
  action: 'removed' | 'added' | 'modified';
  scamReportId: string; // Optional, if the notification is related to a scam report
  replyId?: string; // Optional, if the notification is related to a reply
  createdBy: string; // Optional, if the notification is related to a user action
  readBy: string[]; // Array of user IDs who have read the notification
  onlyFor?: string; // Optional, if the notification is only for a specific user
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
  notificationSettings: {
    scamTest: boolean;
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
  badgesObtained: Badge[];
};

export type ScamReport = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  images?: string[];
  title: string;
  createdBy: User;
  numOfReplies: number;
  scamReportType: ScamReportType;
  isEducation: boolean;
  isDeleted: boolean;
  scamReportStatus: ScamReportStatus;
  votes: { type: VoteType; voterId: string }[];
  replies: Reply[];
  location?: { postalCode: string; latitude: number; longitude: number };
};

export type Reply = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  images?: string[];
  replies?: Reply[];
  createdBy: User;
};

export interface Question {
  question: string;
  options: QuestionOptions[];
}

interface QuestionOptions {
  description: string;
  isCorrect: boolean;
}
