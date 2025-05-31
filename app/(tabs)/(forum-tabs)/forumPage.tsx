import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ForumPost } from "~/components/custom-ui/forum-post";
import { ForumReply } from "~/components/custom-ui/forum/forum-reply";
import { ForumReplyPopup } from "~/components/custom-ui/forum/forum-reply-popup";
import { Text } from "~/components/ui/text";
import { liveUpdateOnASingleScamReport } from "~/firebase/ForumApi";
import { ScamReport } from "~/lib/types";
import { useColorScheme } from "~/lib/useColorScheme";

export default function ForumPage() {
  const { colorScheme } = useColorScheme();
  const { scamReportId } = useLocalSearchParams<{ scamReportId: string }>();
  const [scamReport, setScamReport] = useState<ScamReport>();
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  useEffect(() => {
    liveUpdateOnASingleScamReport(scamReportId, (data: any) => {
      console.log("Scam report data received", data);
      setScamReport(data as ScamReport);
    });
  }, [scamReportId]);
  const router = useRouter();
  if (scamReport === undefined) {
    console.log("Scam report is undefined", scamReportId);
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-secondary/30">
        <Text className="text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        className={`flex-1 justify-start items-start gap-5  bg-secondary/30 ${
          Platform.OS == "ios" ? "" : "pt - 10"
        }`}
      >
        <View className="w-full flex-row justify-end items-center px-4  border-b-2 border-b-secondary">
          <Pressable className="p-2 " onPress={() => router.back()}>
            <FontAwesome6
              name="x"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </Pressable>
        </View>
        <ScrollView className="flex-1 w-full gap-y-2">
          <ForumPost
            scamReport={scamReport}
            fulltext={true}
            showReplyButton
            onClickReply={() => setShowReplyPopup(!showReplyPopup)}
          />
          {scamReport.replies.map((reply, index) => (
            <ForumReply reply={reply} key={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
      {showReplyPopup && (
        <ForumReplyPopup
          scamReportOrReply={scamReport}
          isScamReport={true}
          onBlur={() => setShowReplyPopup(false)}
        />
      )}
    </KeyboardAvoidingView>
  );
}
