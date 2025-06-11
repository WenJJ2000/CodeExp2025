import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/useContext/useAuthContext";
import { useEffect, useState } from "react";
import { User } from "lucide-react-native";
import { ScamReport } from "~/lib/types";
import { liveUpdateUserReports } from "~/firebase/UserApi";
import { Badge } from "~/components/ui/badge";
import { badges } from "../../../components/ui/badges"; // adjust path as needed
import { ReportCard } from "./components/Report";
import ProfileWaveHighlight from "./components/ProfileWaveHighlight";
import { useColorScheme } from "~/lib/useColorScheme";

const router = useRouter();

export default function ProfileScreen() {
  const { user, setUser, setUid, uid } = useAuth();
  const [verifiedReports, setVerifiedReports] = useState<ScamReport[]>([]);
  const [pendingReports, setPendingReports] = useState<ScamReport[]>([]);
  useEffect(() => {
    const unsub = liveUpdateUserReports(
      uid,
      (total: ScamReport[], verified: ScamReport[]) => {
        setVerifiedReports(verified);
        setPendingReports(
          total.filter((report) => report.scamReportStatus === "INVALID")
        );
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const { isDarkColorScheme } = useColorScheme();
  return (
    <ScrollView className="flex-1 bg-secondary/30 p-4 space-y-6">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        {/* Avatar */}
        <Image
          source={{ uri: `data:image/jpeg;base64,${user?.profilePicture}` }}
          className="w-14 h-14 rounded-full mr-3 border-2 border-gray-300"
        />
        <ProfileWaveHighlight />

        {/* My Activity Button
        <Pressable className="bg-blue-500 px-4 py-2 rounded-full">
          <Text className="text-white font-bold text-sm">My Activity</Text>
        </Pressable> */}

        {/* Settings Icon */}
        <Pressable onPress={() => router.push("/settings")}>
          <FontAwesome6
            name="gear"
            size={24}
            color={isDarkColorScheme ? "white" : "black"}
          />
        </Pressable>
      </View>

      {/* Greeting with Custom Character */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-semibold">Hello, {user?.username}!</Text>
        <Image
          source={{
            uri: "https://styles.redditmedia.com/t5_2qh1i/styles/profileIcon_snoo-nft.png",
          }}
          className="w-10 h-10"
        />
      </View>

      {/* Badges */}
      <View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Badges</Text>
          <Pressable
            onPress={() => router.push("/(tabs)/(profile-tabs)/allBadgePage")}
          >
            <Text className="text-sm text-blue-500">View all</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-3"
        >
          {badges.map((badge, index) => (
            <Badge
              key={index}
              variant="default"
              className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-md mx-2"
            >
              <Text className="text-2xl">{badge.emoji}</Text>
            </Badge>
          ))}
        </ScrollView>
      </View>

      {/* Reports */}
      <View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Reports history</Text>
          <Pressable
            onPress={() => router.push("/(tabs)/(profile-tabs)/allReportsPage")}
          >
            <Text className="text-sm text-blue-500">View all</Text>
          </Pressable>
        </View>

        {/* Verified */}
        <View className="mb-4">
          <Text className="text-base font-medium mb-2">✅ Verified scams</Text>
          {verifiedReports
            .reduce((acc, curr, index) => {
              if (index < 5) acc.push(curr);
              return acc;
            }, [] as ScamReport[])
            .map((item, index) => (
              <ReportCard
                key={index}
                title={item.title}
                date={item.createdAt.toISOString().split("T")[0]}
                variant="verified"
              />
            ))}
        </View>

        {/* Pending */}
        <View>
          <Text className="text-base font-medium mb-2">🕓 Pending scams</Text>
          {pendingReports
            .reduce((acc, curr, index) => {
              if (index < 5) acc.push(curr);
              return acc;
            }, [] as ScamReport[])
            .map((item, index) => (
              <ReportCard
                key={index}
                title={item.title}
                date={item.createdAt.toISOString().split("T")[0]}
                variant="pending"
              />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}
