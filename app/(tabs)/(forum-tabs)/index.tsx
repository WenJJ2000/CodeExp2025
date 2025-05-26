import { useState } from "react";
import { Pressable, ScrollView, View, Image } from "react-native";
import ForumHeader, { Filters } from "~/components/custom-ui/forum-header";
import { ForumPost } from "~/components/custom-ui/forum-post";
import { ForumTag } from "~/components/custom-ui/forum-tag";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { Text } from "~/components/ui/text";
import { ScamReport, ScamReportStatus, ScamReportType } from "~/lib/types";
export default function Screen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Filters>("All");

  return (
    <View className="flex-1 justify-start items-start gap-5  bg-secondary/30">
      <ForumHeader
        searchQuery={searchQuery}
        filter={filter}
        setFilter={setFilter}
        setSearchQuery={setSearchQuery}
      />
      <ScrollView className="flex-1 w-full">
        {tempdata.map((post) => (
          <ForumPost
            key={post.id}
            id={post.id}
            content={post.content}
            createdAt={post.createdAt}
            reporter={post.reporter}
            scamReportType={post.scamReportType}
            scamReportStatus={"VALID"}
            votes={post.votes}
            title={"asd"}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const tempdata: ScamReport[] = [
  {
    id: "1",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "INVALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "2",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "3",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "4",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "5",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "6",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "7",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "8",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "9",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "10",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "11",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
  {
    id: "12",
    title: "Fake Job Offer",
    content: "This is a scam report about a fake job offer.",
    createdAt: "2023-10-01T12:00:00Z",
    reporter: {
      id: "user1",
      email: "user1@gmail.com",
      name: "John Doe",
      profilePicture: "https://example.com/profile1.jpg",
      quizLevelCleared: 2,
      notificationSettings: {
        id: "notif1",
        scamTest: true,
        email: true,
        sms: false,
        phone: false,
      },
      badgesObtained: [
        {
          id: "badge1",
          title: "Scam Buster",
          image: "https://example.com/badge1.png",
        },
      ],
      replies: [],
    },
    scamReportType: "Email",
    scamReportStatus: "VALID",
    votes: [
      {
        id: "vote1",
        voter: {
          id: "user2",
          email: "user2@gmail.com",
          name: "Jane Smith",
          profilePicture: "https://example.com/profile2.jpg",
          quizLevelCleared: 3,
          notificationSettings: {
            id: "notif2",
            scamTest: false,
            email: true,
            sms: true,
            phone: false,
          },
          badgesObtained: [],
          replies: [],
        },
        type: "UPVOTE",
      },
      {
        id: "vote2",
        voter: {
          id: "user3",
          email: "user3@gmail.com",
          name: "Alice Johnson",
          profilePicture: "https://example.com/profile3.jpg",
          quizLevelCleared: 1,
          notificationSettings: {
            id: "notif3",
            scamTest: true,
            email: false,
            sms: true,
            phone: true,
          },
          badgesObtained: [
            {
              id: "badge2",
              title: "Scam Reporter",
              image: "https://example.com/badge2.png",
            },
          ],
          replies: [],
        },
        type: "DOWNVOTE",
      },
    ],
  },
];
