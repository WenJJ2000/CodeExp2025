import { View, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { ReportCard } from "./components/Report"; // Adjust path as needed
import { liveUpdateUserReports } from "~/firebase/UserApi";
import { ScamReport } from "~/lib/types";
import { useState, useEffect } from "react";
import { useAuth } from "~/lib/useContext/useAuthContext";
import { Text } from "~/components/ui/text";
export default function AllReportsScreen() {
  const router = useRouter();
  const [verifiedReports, setVerifiedReports] = useState<ScamReport[]>([]);
  const [pendingReports, setPendingReports] = useState<ScamReport[]>([]);
  const { uid, user } = useAuth();
  useEffect(() => {
    const unsub = liveUpdateUserReports(uid, (total, verified) => {
      setVerifiedReports(verified || []);
      setPendingReports(total.filter((report) => !verified.includes(report)));
    });
  }, []);

  return (
    <ScrollView className="flex-1 p-4">
      {/* Back */}
      {/* <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-blue-600 text-lg">←</Text>
      </Pressable> */}

      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-3xl font-bold">{user?.username}’s Reports</Text>
        <Image
          source={{
            uri: "https://styles.redditmedia.com/t5_2qh1i/styles/profileIcon_snoo-nft.png",
          }}
          className="w-10 h-10"
        />
      </View>

      {/* Verified Section */}
      <View className="mb-6">
        <Text className="text-xl font-semibold mb-2">✅ Verified scams</Text>
        {verifiedReports.map((item, index) => (
          <ReportCard
            key={index}
            title={item.title}
            date={item.createdAt.toISOString().split("T")[0]}
            variant="verified"
          />
        ))}
      </View>

      {/* Pending Section */}
      <View>
        <Text className="text-xl font-semibold mb-2">🕓 Pending scams</Text>
        {pendingReports.map((item, index) => (
          <ReportCard
            key={index}
            title={item.title}
            date={item.createdAt.toISOString().split("T")[0]}
            variant="pending"
          />
        ))}
      </View>
    </ScrollView>
  );
}
