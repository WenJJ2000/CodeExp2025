import { useState } from "react";
import { View, Image, Pressable, Platform, Dimensions } from "react-native";
import { Text } from "~/components/ui/text";
import { Reply } from "~/lib/types";
import { ForumReplyImage } from "./forum-reply-image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ForumReplyButton } from "./forum-reply-button";

export function ForumReply({ reply }: { reply: Reply }) {
  if (!reply) {
    return null; // Handle the case where reply is undefined
  }
  const [zoom, setZoom] = useState(false);
  const [image, setImage] = useState<string>();
  const lastUpdated = new Date(Date.now() - reply.createdAt.getTime());
  const hoursAgo = lastUpdated.getHours();
  const minutesAgo = lastUpdated.getMinutes();
  const formattedTimeAgo = hoursAgo > 0 ? `${hoursAgo}h` : `${minutesAgo}m`;
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  console.log("Reply content:", screenHeight);
  return (
    <>
      <View className="px-2 py-2 bg-secondary">
        <View className="flex-row items-center gap-2 ">
          <Image
            src={reply.user.profilePicture || "~/assets/images/icon2.png"}
            className="w-10 h-10 rounded-full border-2 border-gray-300"
            resizeMode="contain"
            resizeMethod="scale"
          />
          <Text className="text-xl ">{reply.user.username}</Text>
          <Text className="text-xl text-muted-foreground">
            {formattedTimeAgo}
          </Text>
        </View>

        <View className="px-2 py-2  ml-2 border-l-2 border-l-primary gap-2">
          <Text className="text-base text-muted-foreground">
            {reply.content}
          </Text>
          {reply.image && <ForumReplyImage image={reply.image} />}
        </View>
        <View className="px-2   ml-2 border-l-2 border-l-primary items-end gap-2">
          <ForumReplyButton onPress={() => {}} />
        </View>
      </View>
    </>
  );
}
