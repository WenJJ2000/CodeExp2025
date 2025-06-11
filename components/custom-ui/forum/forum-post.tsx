import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image, Pressable, useColorScheme, View } from "react-native";
import { Text } from "~/components/ui/text";
import { ForumTagVariant, ScamReport } from "~/lib/types";
import ImageTray from "../image-tray";
import { ForumReplyButton } from "./forum-reply-button";
import { ForumTag } from "./forum-tag";
import { ForumVoteButton } from "./forum-vote-button";

export function ForumPost({
  scamReport,
  fulltext = false,
  onClick = () => {
    console.log("Post clicked");
  },
  showReplyButton = false,
  onClickReply = () => {},
}: {
  scamReport?: ScamReport;
  fulltext?: boolean;
  onClick?: () => void;
  showReplyButton?: boolean;
  onClickReply?: () => void;
}) {
  if (!scamReport) {
    return null; // Handle the case where scamReport is undefined
  }

  const colorScheme = useColorScheme();

  const lastUpdated =
    scamReport.updatedAt.getTime() > scamReport.createdAt.getTime()
      ? new Date(new Date().getTime() - scamReport.updatedAt.getTime())
      : new Date(new Date().getTime() - scamReport.createdAt.getTime());
  const daysAgo = Math.ceil(lastUpdated.getTime() / (1000 * 60 * 60 * 24)) - 1;
  const hoursAgo = Math.ceil(lastUpdated.getTime() / (1000 * 60 * 60)) - 1;
  const minutesAgo = Math.ceil(lastUpdated.getTime() / (1000 * 60));
  const formattedTimeAgo =
    daysAgo > 0
      ? `${daysAgo}d`
      : hoursAgo > 0
      ? ` ${hoursAgo}h`
      : `${minutesAgo}m`;

  const formmatedTitle =
    !fulltext && scamReport.title.split("\n").length > 2
      ? scamReport.title.split("\n").slice(0, 2).join(" ").concat("...")
      : scamReport.title.length > 100
      ? scamReport.title.substring(0, 97) + "..."
      : scamReport.title;

  const formmatedContent =
    !fulltext &&
    scamReport.content.split("\n").length > 2 &&
    scamReport.content.length > 100
      ? scamReport.content
          .substring(0, 97)
          .split("\n")
          .slice(0, 2)
          .join(" ")
          .concat("...")
      : scamReport.content.length > 100
      ? scamReport.content.substring(0, 97) + "..."
      : scamReport.content.trimEnd();
  return (
    <Pressable
      className="w-full bg-secondary rounded-xl shadow-lg mb-4 p-4"
      onPress={onClick}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={{
              uri: `data:image/jpeg;base64,${scamReport?.createdBy?.profilePicture}`,
            }}
            className="w-12 h-12 rounded-full border-2 border-gray-300"
            resizeMode="contain"
          />
          <Text className="text-lg font-semibold">
            {scamReport?.createdBy.username}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {formattedTimeAgo}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <ForumTag
            variant={
              scamReport?.scamReportType.toUpperCase() as ForumTagVariant
            }
          />
          {scamReport?.scamReportStatus === "VALID" && (
            <ForumTag variant={"VERIFIED" as ForumTagVariant} />
          )}
          {scamReport?.isEducation && (
            <ForumTag variant={"EDUCATION" as ForumTagVariant} />
          )}
        </View>
      </View>
      <View className="w-full mb-2">
        <Text className="text-xl font-bold text-start">{formmatedTitle}</Text>
        <Text className="text-start text-muted-foreground">
          {fulltext ? scamReport.content : formmatedContent}
        </Text>
      </View>
      {scamReport?.images && fulltext && (
        <View className="px-4 pb-2 w-full">
          <ImageTray images={scamReport.images} />
        </View>
      )}
      <View className="flex-row justify-between items-center mt-3">
        <View className="flex-row items-center gap-3">
          <ForumVoteButton scamReport={scamReport} />
          <View className="flex-row items-center border-2 border-gray-300 rounded-lg p-1">
            <FontAwesome6 name="comment" size={16} color={colorScheme === "dark" ? "white" : "black"} />
            <Text className="text-lg ml-1">
              {scamReport?.numOfReplies || 0}
            </Text>
          </View>
        </View>
        {showReplyButton && <ForumReplyButton onPress={onClickReply} />}
      </View>
    </Pressable>
  );
}
