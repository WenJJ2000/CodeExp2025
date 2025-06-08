import { useState } from "react";
import {
  View,
  Image,
  Pressable,
  Platform,
  Dimensions,
  FlatList,
} from "react-native";
import { Text } from "~/components/ui/text";
import { Reply } from "~/lib/types";
import { PressableImage } from "../pressable-image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ForumReplyButton } from "./forum-reply-button";
import { ForumReplyPopup } from "./forum-reply-popup";

export function ForumReply({
  reply,
  onClickReply = (reply: Reply) => {
    console.log("Reply clicked");
  },
}: {
  reply: Reply;
  onClickReply?: (reply: Reply) => void;
}) {
  if (!reply) {
    return null; // Handle the case where reply is undefined
  }
  const latestDate =
    reply.createdAt.toUTCString() == reply.updatedAt.toUTCString()
      ? reply.createdAt
      : reply.updatedAt;
  const isUpdated =
    reply.createdAt.toUTCString() != reply.updatedAt.toUTCString();
  const lastUpdated = new Date(Date.now() - latestDate.getTime());
  const hoursAgo = lastUpdated.getHours();
  const minutesAgo = lastUpdated.getMinutes();
  const formattedTimeAgo = hoursAgo > 0 ? `${hoursAgo}h` : `${minutesAgo}m`;
  return (
    <>
      <View className="">
        <View className="flex-row items-center gap-2 ">
          <Image
            src={reply.createdBy.profilePicture || "~/assets/images/icon2.png"}
            className="w-10 h-10 rounded-full border-2 border-gray-300"
            resizeMode="contain"
            resizeMethod="scale"
          />
          <Text className="text-xl ">{reply.createdBy.username}</Text>
          <Text className="text-xl text-muted-foreground">
            {formattedTimeAgo} {isUpdated ? "(edited)" : ""}
          </Text>
        </View>

        <View className="px-2 py-2  ml-2 border-l-2 border-l-primary gap-2">
          <Text className="text-base text-muted-foreground">
            {reply.content}
          </Text>
          {reply.image && <PressableImage image={reply.image} />}
        </View>
        <View className="px-2   ml-2 border-l-2 border-l-primary items-end gap-2">
          <ForumReplyButton onPress={() => onClickReply(reply)} />
        </View>
        <View className="ml-4 bg-secondary/30">
          <FlatList
            data={reply.replies}
            renderItem={({ item }) => (
              <ForumReply reply={item} onClickReply={onClickReply} />
            )}
          />
        </View>
      </View>
    </>
  );
}
