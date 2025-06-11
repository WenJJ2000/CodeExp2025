// import { FontAwesome6 } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { Image, Pressable, ScrollView, View } from "react-native";
// import { Badge } from "~/components/ui/badge";
// import { Text } from "~/components/ui/text";
// import { liveUpdateUserReports } from "~/firebase/UserApi";
// import { ScamReport } from "~/lib/types";
// import { useColorScheme } from "~/lib/useColorScheme";
// import { useAuth } from "~/lib/useContext/useAuthContext";
// import { badges } from "../../../components/ui/badges"; // adjust path as needed
// import ProfileWaveHighlight from "./components/ProfileWaveHighlight";
// import { ReportCard } from "./components/Report";

// const router = useRouter();

// export default function ProfileScreen() {
//   const { user, setUser, setUid, uid } = useAuth();
//   const [verifiedReports, setVerifiedReports] = useState<ScamReport[]>([]);
//   const [pendingReports, setPendingReports] = useState<ScamReport[]>([]);
//   useEffect(() => {
//     const unsub = liveUpdateUserReports(
//       uid,
//       (total: ScamReport[], verified: ScamReport[]) => {
//         setVerifiedReports(verified);
//         setPendingReports(
//           total.filter((report) => report.scamReportStatus === "INVALID")
//         );
//       }
//     );
//     return () => {
//       unsub();
//     };
//   }, []);
//   const { isDarkColorScheme } = useColorScheme();
//   return (
//     <ScrollView className="flex-1 bg-secondary/30 p-4 space-y-6">
//       {/* Header */}
//       <View className="flex-row justify-between items-center">
//         {/* Avatar */}
//         <Image
//           source={{ uri: `data:image/jpeg;base64,${user?.profilePicture}` }}
//           className="w-14 h-14 rounded-full mr-3 border-2 border-gray-300"
//         />
//         <ProfileWaveHighlight />

//         {/* My Activity Button
//         <Pressable className="bg-blue-500 px-4 py-2 rounded-full">
//           <Text className="text-white font-bold text-sm">My Activity</Text>
//         </Pressable> */}

//         {/* Settings Icon */}
//         <Pressable onPress={() => router.push("/settings")}>
//           <FontAwesome6
//             name="gear"
//             size={24}
//             color={isDarkColorScheme ? "white" : "black"}
//           />
//         </Pressable>
//       </View>

//       {/* Greeting with Custom Character */}
//       <View className="flex-row items-center justify-between">
//         <Text className="text-xl font-semibold">Hello, {user?.username}!</Text>
//         <Image
//           source={{
//             uri: "https://styles.redditmedia.com/t5_2qh1i/styles/profileIcon_snoo-nft.png",
//           }}
//           className="w-10 h-10"
//         />
//       </View>

//       {/* Badges */}
//       <View>
//         <View className="flex-row justify-between items-center mb-2">
//           <Text className="text-lg font-semibold">Badges</Text>
//           <Pressable
//             onPress={() => router.push("/(tabs)/(profile-tabs)/allBadgePage")}
//           >
//             <Text className="text-sm text-blue-500">View all</Text>
//           </Pressable>
//         </View>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           className="space-x-3 pt-2 pb-2"
//         >
//           {badges.map((badge, index) => (
//             <Badge
//               key={index}
//               variant="default"
//               className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-sm mx-2"
//             >
//               <Text className="text-2xl">{badge.emoji}</Text>
//             </Badge>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Reports */}
//       <View>
//         <View className="flex-row justify-between items-center mb-2">
//           <Text className="text-lg font-semibold">Reports history</Text>
//           <Pressable
//             onPress={() => router.push("/(tabs)/(profile-tabs)/allReportsPage")}
//           >
//             <Text className="text-sm text-blue-500">View all</Text>
//           </Pressable>
//         </View>

//         {/* Verified */}
//         <View className="mb-4">
//           <Text className="text-base font-medium mb-2">✅ Verified scams</Text>
//           {verifiedReports
//             .reduce((acc, curr, index) => {
//               if (index < 5) acc.push(curr);
//               return acc;
//             }, [] as ScamReport[])
//             .map((item, index) => (
//               <ReportCard
//                 key={index}
//                 title={item.title}
//                 date={item.createdAt.toISOString().split("T")[0]}
//                 variant="verified"
//               />
//             ))}
//         </View>

//         {/* Pending */}
//         <View>
//           <Text className="text-base font-medium mb-2">🕓 Pending scams</Text>
//           {pendingReports
//             .reduce((acc, curr, index) => {
//               if (index < 5) acc.push(curr);
//               return acc;
//             }, [] as ScamReport[])
//             .map((item, index) => (
//               <ReportCard
//                 key={index}
//                 title={item.title}
//                 date={item.createdAt.toISOString().split("T")[0]}
//                 variant="pending"
//               />
//             ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// }


import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Text } from "~/components/ui/text";
import { liveUpdateUserReports } from "~/firebase/UserApi";
import { ScamReport } from "~/lib/types";
import { useColorScheme } from "~/lib/useColorScheme";
import { useAuth } from "~/lib/useContext/useAuthContext";
import { badges } from "../../../components/ui/badges"; // adjust path as needed
import ProfileWaveHighlight from "./components/ProfileWaveHighlight";
import { ReportCard } from "./components/Report";

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
  }, [uid]);

  const { isDarkColorScheme } = useColorScheme();

  // Helper to get the first 5 reports
  const getTopReports = (reports: ScamReport[]) => reports.slice(0, 5);

  return (
    <ScrollView
      className={`flex-1 p-6 space-y-8 ${isDarkColorScheme ? "bg-dark-background" : "bg-light-background"
        }`}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center">
        {/* Avatar */}
        <Image
          source={{ uri: `data:image/jpeg;base64,${user?.profilePicture}` }}
          className="w-16 h-16 rounded-full mr-4 border-2 border-gray-300"
        />
        <ProfileWaveHighlight />

      </View>

      {/* Greeting Section */}
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-2xl font-semibold text-primary">Hello, {user?.username}!</Text>
        <Image
          source={{
            uri: "https://styles.redditmedia.com/t5_2qh1i/styles/profileIcon_snoo-nft.png",
          }}
          className="w-12 h-12"
        />
      </View>

      {/* Badges */}
      <View className="mt-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-semibold text-primary">Badges</Text>
          <Pressable
            onPress={() => router.push("/(tabs)/(profile-tabs)/allBadgePage")}
          >
            <Text className="text-sm text-blue-500 font-medium">View all</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-4 pt-3 pb-3"
        >
          {badges.map((badge, index) => (
            <Badge
              key={index}
              variant="default"
              className={`w-20 h-20 rounded-full items-center justify-center shadow-lg mx-2 ${isDarkColorScheme ? "bg-gray-100" : "bg-light-badge border-2 border-gray-500"
                }`}
            >
              <Text className="text-3xl">{badge.emoji}</Text>
            </Badge>
          ))}
        </ScrollView>
      </View>

      {/* Reports */}
      <View>
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-semibold text-primary">Reports History</Text>
          <Pressable
            onPress={() => router.push("/(tabs)/(profile-tabs)/allReportsPage")}
          >
            <Text className="text-sm text-blue-500 font-medium">View all</Text>
          </Pressable>
        </View>

        {/* Verified Reports */}
        <View className="mb-6">
          <Text className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">✅ Verified scams</Text>
          {/* Box Container */}
          <View className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            {/* Check if there are verified reports */}
            {verifiedReports.length > 0 ? (
              <ScrollView className="space-y-4">
                {getTopReports(verifiedReports).map((item, index) => (
                  <View key={index}>
                    <ReportCard
                      title={item.title}
                      date={item.createdAt.toISOString().split("T")[0]}
                      variant="verified"
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text className="text-gray-500 dark:text-gray-300">No verified reports yet.</Text>
            )}
          </View>
          {/* {getTopReports(verifiedReports).map((item, index) => (
            <ReportCard
              key={index}
              title={item.title}
              date={item.createdAt.toISOString().split("T")[0]}
              variant="verified"
            />
          ))} */}
        </View>

        {/* Pending Reports */}
        <View>
          <Text className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">🕓 Pending scams</Text>
          {/* Box Container */}
          <View className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            {/* Check if there are pending reports */}
            {pendingReports.length > 0 ? (
              <ScrollView className="space-y-4 h-40">
                {getTopReports(pendingReports).map((item, index) => (
                  <View key={index}>
                    <ReportCard
                      title={item.title}
                      date={item.createdAt.toISOString().split("T")[0]}
                      variant="pending"
                    />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text className="text-gray-500 dark:text-gray-300">No pending reports yet.</Text>
            )}
          </View>
          {/* {getTopReports(pendingReports).map((item, index) => (
            <ReportCard
              key={index}
              title={item.title}
              date={item.createdAt.toISOString().split("T")[0]}
              variant="pending"
            />
          ))} */}
        </View>

      </View>
    </ScrollView>
  );
}
