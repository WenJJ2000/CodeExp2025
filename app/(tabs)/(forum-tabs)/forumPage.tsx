import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Redirect } from "expo-router";
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
import { ForumPost } from "~/components/custom-ui/forum/forum-post";
import { ForumReply } from "~/components/custom-ui/forum/forum-reply";
import { ForumReplyPopup } from "~/components/custom-ui/forum/forum-reply-popup";
import SafeAreaViewForAndroid from "~/components/custom-ui/SafeAreaViewForAndriod";
import { Text } from "~/components/ui/text";
import { liveUpdateOnASingleScamReport } from "~/firebase/ForumApi";
import { Reply, ScamReport } from "~/lib/types";
import { useColorScheme } from "~/lib/useColorScheme";

export default function ForumPage() {
  const { colorScheme } = useColorScheme();
  const { scamReportId } = useLocalSearchParams<{ scamReportId: string }>();
  const [scamReport, setScamReport] = useState<ScamReport>();
  const [scamReportOrReply, setScamReportOrReply] = useState<
    ScamReport | Reply | undefined
  >();
  const [isScamReport, setIsScamReport] = useState(true);
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    liveUpdateOnASingleScamReport(scamReportId, (data: any) => {
      setScamReport(data as ScamReport);
      setIsLoading(false);
    });
  }, [scamReportId]);
  const router = useRouter();

  useEffect(() => {}, []);
  if (scamReport === undefined) {
    return (
      <SafeAreaViewForAndroid className="flex-1 justify-center items-center bg-secondary/30">
        <Text className="text-lg">Loading...</Text>
        {!isLoading && <Redirect href={"/(tabs)/(forum-tabs)"} />}
      </SafeAreaViewForAndroid>
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
          contentContainerClassName="gap-2 bg-transparent"
          className="py-2 bg-secondary px-2"
          keyExtractor={(item) => item.id}
        />
      </View>
      {showReplyPopup && scamReportOrReply && (
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
