import { View, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { Reply } from "~/lib/types";

export function ForumReply({ reply }: { reply: Reply }) {
  if (!reply) {
    return null; // Handle the case where reply is undefined
  }
  console.log("Rendering ForumReply", reply.createdAt);
  const lastUpdated = new Date(Date.now() - reply.createdAt.getTime());
  const hoursAgo = lastUpdated.getHours();
  const minutesAgo = lastUpdated.getMinutes();
  const formattedTimeAgo = hoursAgo > 0 ? `${hoursAgo}h` : `${minutesAgo}m`;

  return (
    <View className="px-2 py-2 bg-secondary/50">
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

      <View className="px-2 py-2  ml-2 border-l-2 border-l-primary">
        <Text className="text-base text-muted-foreground">{reply.content}</Text>
      </View>
    </View>
  );
}
