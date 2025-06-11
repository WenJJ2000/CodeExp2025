import { View, ScrollView, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Badge } from "~/components/ui/badge";
import { Text } from "~/components/ui/text";
const badges = [
  { emoji: "🏆", label: "Azure", date: "21 May 2025" },
  { emoji: "🌐", label: "OWASP", date: "25 Apr 2025" },
  { emoji: "☁️", label: "AWS", date: "31 Dec 2024" },
  { emoji: "👨‍💻", label: "Hacker", date: "15 Apr 2024" },
  { emoji: "🔥", label: "Hotshot", date: "1 Jan 2024" },
  { emoji: "🐍", label: "Coldshot", date: "20 Mar 2023" },
];

export default function AllBadgesScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1p-4">
      {/* Back Button */}
      {/* <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-blue-600 text-lg">←</Text>
      </Pressable> */}

      {/* Title */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-3xl font-bold">Hacker123’s Badges</Text>
        <Image
          source={{
            uri: "https://styles.redditmedia.com/t5_2qh1i/styles/profileIcon_snoo-nft.png",
          }}
          className="w-10 h-10"
        />
      </View>

      {/* Grid of Badges */}
      <View className="flex-row flex-wrap justify-between">
        {badges.map((badge, i) => (
          <View key={i} className="w-[30%] items-center mb-6">
            <Badge
              variant="default"
              className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-md"
            >
              <Text className="text-2xl">{badge.emoji}</Text>
            </Badge>
            <Text className="text-center mt-1 text-xs font-semibold">
              Obtained:
            </Text>
            <Text className="text-center text-xs text-gray-600">
              {badge.date}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
