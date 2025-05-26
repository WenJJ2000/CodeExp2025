import { Pressable, View, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { ForumTag } from "./forum-tag";
import { ScamReport } from "~/lib/types";
export function ForumPost(props: ScamReport) {
  return (
    <Pressable className="w-full bg-secondary/30 justify-center items-center">
      <View className="flex-row justify-between items-between w-full p-4">
        <View className="flex-row items-center gap-3 ">
          <Image
            src={props.reporter.profilePicture || "~/assets/images/icon2.png"}
            className="w-10 h-10 rounded-full border-2 border-gray-300"
            resizeMode="contain"
            resizeMethod="scale"
          />

          <Text>{props.reporter.name}</Text>
          <Text className="text-sm text-muted-foreground">
            Last updated: 2 days ago
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <ForumTag variant={"Email"} />
          {props.scamReportStatus == "VALID" && <ForumTag variant={"Email"} />}
        </View>
      </View>
      <View className="p-4">
        <Text className="text-base text-muted-foreground">
          This is a brief description of the forum section. It contains
          discussions about various topics related to scams and frauds.
        </Text>
      </View>
    </Pressable>
  );
}
