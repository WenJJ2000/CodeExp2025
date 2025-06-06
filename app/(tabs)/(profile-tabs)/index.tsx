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

// import { ScrollView, View, Image, Pressable } from "react-native";
// import { Text } from "~/components/ui/text";
// import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

// // Sample badge and report data
// const badges = ["🏆", "💯", "🔥", "🎯", "🚀"];
// const reportsVerified = ["Food Quality", "Noise Level"];
// const reportsPending = ["Wi-Fi Speed", "Cleanliness"];

// export default function ProfileScreen() {
//   return (
//     <ScrollView className="flex-1 bg-secondary/30 p-4 space-y-6">
//       {/* Header Row */}
//       <View className="flex-row justify-between items-center">
//         {/* Avatar */}
//         <Image
//           source={{ uri: "https://i.pravatar.cc/100" }}
//           className="w-14 h-14 rounded-full"
//         />

//         {/* My Activity Button */}
//         <Pressable className="bg-blue-500 px-4 py-2 rounded-full">
//           <Text className="text-white font-bold text-sm">My Activity</Text>
//         </Pressable>

//         {/* Settings Icon */}
//         <Pressable>
//           <FontAwesome6 name="gear" size={24} />
//         </Pressable>
//       </View>

//       {/* Greeting */}
//       <View className="flex-row items-center space-x-3">
//         <Text className="text-xl font-semibold">Hello, Hacker123!</Text>
//         <Image
//           source={{ uri: "https://styles.redditmedia.com/t5_2qh1i/styles/profileIcon_snoo-nft.png" }}
//           className="w-8 h-8 rounded-full"
//         />
//       </View>

//       {/* Badges Section */}
//       <View>
//         <View className="flex-row justify-between items-center mb-2">
//           <Text className="text-lg font-semibold">Badges</Text>
//           <Text className="text-sm text-blue-500">View all</Text>
//         </View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
//           {badges.map((badge, index) => (
//             <View
//               key={index}
//               className="bg-white p-4 rounded-xl shadow-md w-20 h-20 justify-center items-center"
//             >
//               <Text className="text-2xl">{badge}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Report History Section */}
//       <View>
//         <View className="flex-row justify-between items-center mb-2">
//           <Text className="text-lg font-semibold">Report History</Text>
//           <Text className="text-sm text-blue-500">View all</Text>
//         </View>

//         {/* Verified Reports */}
//         <View className="mb-4">
//           <Text className="text-base font-medium mb-1">✅ Verified</Text>
//           {reportsVerified.map((report, index) => (
//             <View key={index} className="bg-white p-4 rounded-lg shadow-sm mb-2">
//               <Text>{report}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Pending Reports */}
//         <View>
//           <Text className="text-base font-medium mb-1">🕓 Pending</Text>
//           {reportsPending.map((report, index) => (
//             <View key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm mb-2">
//               <Text>{report}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

import { ScrollView, View, Image, Pressable } from 'react-native';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/lib/useContext/useAuthContext';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { BadgeCard } from "./components/Badge";
import { Badge } from '~/components/ui/badge';
import { ReportCard } from './components/Report';
import { badges } from '../../../components/ui/badges'; // adjust path as needed

// const badgeAws = require("../../../assets/images/aws_certified_security_specialty_badge.png");
// const badgeOwasp = require("../../../assets/images/OWASP_Badge_1.png");
// const badgeReddit = require("../../../assets/images/twitter_thumb_201604_EHA-Shield.png");

const router = useRouter();

// Mock Data
// const badges = [
//   { label: "Achievement" },
//   {  label: "Top Score" },
//   {  label: "Streak" },
//   { emoji: "🎯", label: "Target" },
//   { emoji: "🚀", label: "Rocket" },
// ];

const reportsVerified = [
  { title: 'Verified scam 1', date: '15 Mar 2025' },
  { title: 'Verified scam 2', date: '16 Feb 2025' },
  { title: 'Verified scam 3', date: '4 Dec 2024' },
];

const reportsPending = [
  { title: 'Pending scam 1', date: '30 Nov 2024' },
  { title: 'Pending scam 2', date: '15 Nov 2024' },
  { title: 'Pending scam 3', date: '14 Nov 2024' },
  { title: 'Pending scam 4', date: '5 Sep 2024' },
];

export default function ProfileScreen() {
  const { setUser, setUid } = useAuth();
  return (
    <ScrollView className="flex-1 bg-secondary/30 p-4 space-y-6">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        {/* Avatar */}
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
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

      {/* Greeting with Custom Character */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-semibold">Hello, Hacker123!</Text>
        <Image
          source={{
            uri: 'https://styles.redditmedia.com/t5_2qh1i/styles/profileIcon_snoo-nft.png',
          }}
          className="w-10 h-10"
        />
      </View>

      {/* Badges */}
      <View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Badges</Text>
          <Pressable
            onPress={() => router.push('/(tabs)/(profile-tabs)/allBadgePage')}
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
            onPress={() => router.push('/(tabs)/(profile-tabs)/allReportsPage')}
          >
            <Text className="text-sm text-blue-500">View all</Text>
          </Pressable>
        </View>

        {/* Verified */}
        <View className="mb-4">
          <Text className="text-base font-medium mb-2">✅ Verified scams</Text>
          {reportsVerified.map((item, index) => (
            <ReportCard
              key={index}
              title={item.title}
              date={item.date}
              variant="verified"
            />
          ))}
        </View>

        {/* Pending */}
        <View>
          <Text className="text-base font-medium mb-2">🕓 Pending scams</Text>
          {reportsPending.map((item, index) => (
            <ReportCard
              key={index}
              title={item.title}
              date={item.date}
              variant="pending"
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
