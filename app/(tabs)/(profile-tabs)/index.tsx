// import { View } from "react-native";
// import { Text } from "~/components/ui/text";

// export default function Screen() {
//   return (
//     <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
//       <Text>
//         This is the profile screen. You can add your profile content here.
//         {"\n"}You can use this space to display user information, settings, or
//         any other profile-related content.
//         {"\n"}Feel free to customize this screen as needed.
//         {"\n"}For example, you can show user details, preferences, or any other
//         relevant information that you want to display in the profile section of
//         your application.
//       </Text>
//     </View>
//   );
// }


import { ScrollView, View, Image, Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

// Sample badge and report data
const badges = ["🏆", "💯", "🔥", "🎯", "🚀"];
const reportsVerified = ["Food Quality", "Noise Level"];
const reportsPending = ["Wi-Fi Speed", "Cleanliness"];

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-secondary/30 p-4 space-y-6">
      {/* Header Row */}
      <View className="flex-row justify-between items-center">
        {/* Avatar */}
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          className="w-14 h-14 rounded-full"
        />

        {/* My Activity Button */}
        <Pressable className="bg-blue-500 px-4 py-2 rounded-full">
          <Text className="text-white font-bold text-sm">My Activity</Text>
        </Pressable>

        {/* Settings Icon */}
        <Pressable>
          <FontAwesome6 name="gear" size={24} />
        </Pressable>
      </View>

      {/* Greeting */}
      <View className="flex-row items-center space-x-3">
        <Text className="text-xl font-semibold">Hello, Hacker123!</Text>
        <Image
          source={{ uri: "https://styles.redditmedia.com/t5_2qh1i/styles/profileIcon_snoo-nft.png" }}
          className="w-8 h-8 rounded-full"
        />
      </View>

      {/* Badges Section */}
      <View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Badges</Text>
          <Text className="text-sm text-blue-500">View all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
          {badges.map((badge, index) => (
            <View
              key={index}
              className="bg-white p-4 rounded-xl shadow-md w-20 h-20 justify-center items-center"
            >
              <Text className="text-2xl">{badge}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Report History Section */}
      <View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Report History</Text>
          <Text className="text-sm text-blue-500">View all</Text>
        </View>

        {/* Verified Reports */}
        <View className="mb-4">
          <Text className="text-base font-medium mb-1">✅ Verified</Text>
          {reportsVerified.map((report, index) => (
            <View key={index} className="bg-white p-4 rounded-lg shadow-sm mb-2">
              <Text>{report}</Text>
            </View>
          ))}
        </View>

        {/* Pending Reports */}
        <View>
          <Text className="text-base font-medium mb-1">🕓 Pending</Text>
          {reportsPending.map((report, index) => (
            <View key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm mb-2">
              <Text>{report}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
