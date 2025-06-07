import { Pressable, View, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { ForumTag } from "./forum-tag";
import { ForumTagVariant, ScamReport } from "~/lib/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { ForumVoteButton } from "./forum-vote-button";
import { useColorScheme } from "~/lib/useColorScheme";
import { ForumReplyButton } from "./forum-reply-button";
export function ForumPost({
  scamReport,
  fulltext = false,
  onClick = () => {},
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
  const lastUpdated = new Date(Date.now() - scamReport.createdAt.getTime());
  const daysAgo = lastUpdated.getDay();
  const hoursAgo = lastUpdated.getHours();
  const minutesAgo = lastUpdated.getMinutes();
  // console.log(daysAgo, hoursAgo, minutesAgo);
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
    !fulltext && scamReport.content.split("\n").length > 2
      ? scamReport.content.split("\n").slice(0, 2).join(" ").concat("...")
      : scamReport.content.length > 100
      ? scamReport.content.substring(0, 97) + "..."
      : scamReport.content.trimEnd();

  return (
    <Pressable
      className="w-full bg-secondary justify-center items-center mb-2 "
      onPress={onClick}
    >
      <View className="flex-row justify-between items-between w-full px-4 py-2">
        <View className="flex-row items-center gap-2 ">
          <Image
            src={
              scamReport?.createdBy?.profilePicture ||
              "~/assets/images/icon2.png"
            }
            className="w-10 h-10 rounded-full border-2 border-gray-300"
            resizeMode="contain"
            resizeMethod="scale"
          />
          <Text className="text-xl ">{scamReport?.createdBy.username}</Text>
          <Text className="text-xl text-muted-foreground">
            {formattedTimeAgo}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <ForumTag
            variant={
              scamReport?.scamReportType.toUpperCase() as ForumTagVariant
            }
          />
          {scamReport?.scamReportStatus == "VALID" && (
            <ForumTag
              variant={
                scamReport?.scamReportType.toUpperCase() as ForumTagVariant
              }
            />
          )}
          {scamReport?.isEducation && (
            <ForumTag variant={"EDUCATION" as ForumTagVariant} />
          )}
        </View>
      </View>
      <View className="px-4 pb-2 w-full">
        <Text className="text-xl font-bold text-start">{formmatedTitle}</Text>
        <Text className="text-start text-muted-foreground">
          {formmatedContent}
        </Text>
      </View>
      <View className="w-full px-4 pb-2">
        <View className="flex-row  bg-secondary justify-between items-center gap-2">
          <View className="flex-row items-center ">
            <ForumVoteButton scamReport={scamReport} />
            <View className="ml-2 px-2 py-1 justify-center items-center border-2 border-gray-300 rounded-lg">
              <Text className="text-muted-foreground text-lg">
                <FontAwesome6 name="comment" size={16} />{" "}
                {scamReport?.numOfReplies || 0}
              </Text>
            </View>
          </View>
          {showReplyButton && <ForumReplyButton onPress={onClickReply} />}
        </View>
      </View>
    </Pressable>
  );
}
