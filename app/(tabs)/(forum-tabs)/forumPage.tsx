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
import { Reply, ScamReport } from "~/lib/types";
import { useColorScheme } from "~/lib/useColorScheme";

export default function ForumPage() {
  const { colorScheme } = useColorScheme();
  const { scamReportId } = useLocalSearchParams<{ scamReportId: string }>();
  const [scamReport, setScamReport] = useState<ScamReport>();
  const [scamReportOrReply, setScamReportOrReply] = useState<
    ScamReport | Reply
  >();
  const [isScamReport, setIsScamReport] = useState(true);
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  useEffect(() => {
    liveUpdateOnASingleScamReport(scamReportId, (data: any) => {
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
    <>
      <SafeAreaView
        className={`flex-1 justify-start items-start  bg-secondary/30 ${
          Platform.OS == "ios" ? "" : "pt-10"
        }`}
      >
        <View className="w-full flex-row justify-end items-center px-4  border-b-2 border-b-secondary">
          <Pressable
            className="p-2 "
            onPress={() =>
              router.canGoBack()
                ? router.back()
                : router.push("/(tabs)/(forum-tabs)")
            }
          >
            <FontAwesome6
              name="x"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </Pressable>
        </View>
        <ScrollView className="flex-1 w-full h-full mt-2 gap-2">
          <ForumPost
            scamReport={scamReport}
            fulltext={true}
            showReplyButton
            onClickReply={() => {
              setIsScamReport(true);
              setScamReportOrReply(scamReport);
              setShowReplyPopup(true);
            }}
          />
          {scamReport.replies.map((reply, index) => (
            <ForumReply
              reply={reply}
              key={index}
              onClickReply={() => {
                setIsScamReport(false);
                setScamReportOrReply(reply);
                setShowReplyPopup(true);
              }}
            />
          ))}
        </ScrollView>
        {showReplyPopup && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ForumReplyPopup
              scamReportOrReply={scamReportOrReply}
              isScamReport={isScamReport}
              onBlur={() => setShowReplyPopup(false)}
            />
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    </>
  );
}
