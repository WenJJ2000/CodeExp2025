import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  FlatList,
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

  useEffect(() => {}, []);
  if (scamReport === undefined) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-secondary/30">
        <Text className="text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }
  const onClickReplyButton = (item: Reply) => {
    setIsScamReport(false);
    setScamReportOrReply(item);
    setShowReplyPopup(true);
  };
  return (
    <>
      <View className="flex-1 bg-secondary/30">
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
        <FlatList
          data={scamReport.replies}
          renderItem={({ item }) => (
            <ForumReply reply={item} onClickReply={onClickReplyButton} />
          )}
        />
      </View>
      {showReplyPopup && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ForumReplyPopup
            scamReportId={scamReportId}
            scamReportOrReply={scamReportOrReply}
            isScamReport={isScamReport}
            onBlur={(a, b) => {
              setShowReplyPopup(false);
            }}
          />
        </KeyboardAvoidingView>
      )}
    </>
  );
}
