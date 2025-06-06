import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { ReportCard } from "./components/Report"; // Adjust path as needed

const reportsVerified = [
  { title: "Verified scam 1", date: "15 Mar 2025" },
  { title: "Verified scam 2", date: "16 Feb 2025" },
  { title: "Verified scam 3", date: "4 Dec 2024" },
];

const reportsPending = [
  { title: "Pending scam 1", date: "30 Nov 2024" },
  { title: "Pending scam 2", date: "15 Nov 2024" },
  { title: "Pending scam 3", date: "14 Nov 2024" },
  { title: "Pending scam 4", date: "5 Sep 2024" },
];

export default function AllReportsScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Back */}
      <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-blue-600 text-lg">←</Text>
      </Pressable>

      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-3xl font-bold">Hacker123’s Reports</Text>
        <Image
          source={{ uri: "https://styles.redditmedia.com/t5_2qh1i/styles/profileIcon_snoo-nft.png" }}
          className="w-10 h-10"
        />
      </View>

      {/* Verified Section */}
      <View className="mb-6">
        <Text className="text-xl font-semibold mb-2">✅ Verified scams</Text>
        {reportsVerified.map((item, index) => (
          <ReportCard key={index} title={item.title} date={item.date} variant="verified" />
        ))}
      </View>

      {/* Pending Section */}
      <View>
        <Text className="text-xl font-semibold mb-2">🕓 Pending scams</Text>
        {reportsPending.map((item, index) => (
          <ReportCard key={index} title={item.title} date={item.date} variant="pending" />
        ))}
      </View>
    </ScrollView>
  );
}
