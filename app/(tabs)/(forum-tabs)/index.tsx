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
    <View className="flex-1 pt-10 justify-start items-start gap-5  bg-secondary/30">
      <ForumHeader
        searchQuery={searchQuery}
        filter={filter}
        setFilter={setFilter}
        setSearchQuery={setSearchQuery}
      />
      <ScrollView className="flex-1 w-full gap-y-2">
        {tempdata.map((post) => (
          <ForumPost scamReport={post} key={post.id} />
        ))}
      </ScrollView>
    </View>
  );
}

export const tempdata: ScamReport[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
  (x) =>
    ({
      id: x.toString(),
      title: "Scam Report Example " + x,
      content:
        "This is a sample scam report content for post This is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for postThis is a sample scam report content for post" +
        x,
      createdAt: "2023-10-01T12:00:00Z",
      reporter: {
        id: "user1",
        email: "user1@gmail.com",
        name: "User" + x,
        profilePicture: "https://example.com/user1.jpg",
        quizLevelCleared: 1,
        notificationSettings: {
          id: "notif1",
          scamTest: true,
          email: true,
          sms: false,
          phone: false,
        },
        badgesObtained: [],
        replies: [],
      },
      scamReportType: "Email",
      scamReportStatus: "VALID",
      votes: [
        {
          id: "vote1",
          voter: {
            id: "user1",
            email: "user1@gmail.com",
            name: "User One",
            profilePicture: "https://example.com/user1.jpg",
            quizLevelCleared: 1,
            notificationSettings: {
              id: "notif1",
              scamTest: true,
              email: true,
              sms: false,
              phone: false,
            },
            badgesObtained: [],
            replies: [],
          },
          type: "UPVOTE",
        },
      ],
      replies: [
        {
          id: "reply1",
          content:
            "This is a sample reply for scam reportThis is a sample reply for scam report This is a sample reply for scam report This is a sample reply for scam report This is a sample reply for scam report This is a sample reply for scam report This is a sample reply for scam report This is a sample reply for scam report This is a sample reply for scam report This is a sample reply for scam report  " +
            x,
          createdAt: "2023-10-01T12:00:00Z",
          user: {
            id: "user2",
            email: "user2@gmail.com",
            name: "User Two",
            profilePicture: "https://example.com/user2.jpg",
            quizLevelCleared: 1,
            notificationSettings: {
              id: "notif2",
              scamTest: true,
              email: true,
              sms: false,
              phone: false,
            },
            badgesObtained: [],
            replies: [],
          },
          replyTo: {
            id: "replyTo1",
            content: "This is a reply to the scam report",
            createdAt: "2023-10-01T12:00:00Z",
          },
        },
      ],
    } as ScamReport)
);
