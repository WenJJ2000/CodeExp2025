import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useEffect } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { ForumPost } from "~/components/custom-ui/forum-post";
import { Text } from "~/components/ui/text";
import { tempdata } from "../(forum-tabs)/index";
export default function ForumPage() {
  const { scamReportId } = useLocalSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (!scamReportId || isNaN(parseInt(scamReportId as string))) {
      console.warn("No scamReportId provided, redirecting to forum list.");
      router.replace({
        pathname: "/(tabs)/(forum-tabs)",
        params: {},
      });
    }
    console.log(tempdata[parseInt(scamReportId as string) - 1]);
  }, [scamReportId, router]);
  return (
    <View className="flex-1 pt-10 justify-start items-start gap-5 bg-secondary/30">
      <View className="w-full flex-row justify-end items-center px-4  border-b-2 border-b-secondary">
        <Pressable className="p-2 " onPress={() => router.back()}>
          <FontAwesome6 name="x" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView className="flex-1 w-full gap-y-2">
        <ForumPost
          scamReport={tempdata[parseInt(scamReportId as string) - 1]}
          clickable={false}
          fulltext={true}
        />
        {tempdata[0].replies.map((reply, index) => (
          <View key={index} className="px-2 py-2 bg-secondary/50">
            <View className="px-2 py-2 bg-secondary/50 ml-2 border-l-2 border-l-primary">
              <Text className="text-lg font-semibold">{reply.user.name}</Text>
              <Text className="text-base text-muted-foreground">
                {reply.content}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
