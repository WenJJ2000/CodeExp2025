import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";
import HomeMap from "~/components/custom-ui/home/home-map";
import HomeStatsPanel from "~/components/custom-ui/home/homeStatsPanel";
import { getNotifications } from "~/firebase/NotiApi";
import { liveUpdateUserReports } from "~/firebase/UserApi";
import { Notification, ScamReport } from "~/lib/types";
// import { NotificationType, getNotifications } from "~/firebase/NotiApi"; // update path as needed
import { useAuth } from "~/lib/useContext/useAuthContext";
dayjs.extend(relativeTime);

const shortcuts = [
  {
    key: "text",
    iconType: MaterialIcons,
    iconName: "email",
    label: "Phishing",
  },
  { key: "image", iconType: FontAwesome5, iconName: "camera", label: "Image" },
  { key: "number", iconType: FontAwesome5, iconName: "phone", label: "Number" },
  {
    key: "app",
    iconType: Ionicons,
    iconName: "phone-portrait-outline",
    label: "App",
  },
  {
    key: "crypto",
    iconType: MaterialIcons,
    iconName: "security",
    label: "Crypto",
  },
];
export default function Home() {
  const router = useRouter();
  const colorScheme = useColorScheme(); // 'light' or 'dark'
  const { user, uid } = useAuth();
  const [userName, setUserName] = useState("Lisa");
  const [postCount, setPostCount] = useState(2);
  const [scamCount, setScamCount] = useState(1);
  const [verifiedCount, setVerifiedCount] = useState(1);
  const [notificationCount, setNotificationCount] = useState(5);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // Helper to toggle icon colors based on theme
  const iconColor = colorScheme === "dark" ? "#ccc" : "#000";

  useEffect(() => {
    // Subscribes to realtime updates
    // const unsubscribe = getNotifications(setNotifications);
    const unsubscribe = getNotifications(
      uid,
      (notifications: Notification[]) => {
        setNotifications(notifications);
        setNotificationCount(notifications.length);
      }
    );
    const unsub = liveUpdateUserReports(
      uid,
      (total: ScamReport[], verified: ScamReport[]) => {
        setPostCount(total.length);
        setVerifiedCount(verified.length);
      }
    );
    user && setUserName(user.username);
    return () => {
      unsubscribe();
      unsub();
    };
  }, []);

  return (
    <View className={`flex-1 pt-5 px-6 bg-white dark:bg-black`}>
      {/* Header */}
      {/* <View className="flex-row items-center mb-6">
        <Image
          source={{ uri: `data:image/jpeg;base64,${user?.profilePicture}` }}
          className="w-12 h-12 rounded-full mr-3 border-2 border-gray-300"
        />
        <Text className="text-2xl font-bold flex-1 text-black dark:text-white">
          Welcome {userName}!
        </Text>
      </View> */}

      <Text className="text-xl font-semibold text-black dark:text-white pb-2 mt-2">
        Your Scam Stats
      </Text>
      <HomeStatsPanel
        scamsChecked={9}
        dollarsSaved={9 * 40} // example: $40 saved per scam checked
      />

      {/* Shortcuts */}
      {/* <Text className="text-lg font-semibold mb-3 text-black dark:text-white">
        Check Scams
      </Text> */}
      {/* <Text className="text-lg font-semibold mb-3 text-black dark:text-white">Check Scams</Text>
      <View className="flex-row justify-between mb-6">
        {shortcuts.map((sc) => {
          const IconComponent = sc.iconType;
          return (
            <Pressable
              key={sc.key}
              className="shortcut-btn"
              onPress={() =>
                router.push(`/(home-tabs)/checkScam?type=${sc.key}` as any)
              }
              android_ripple={{ color: "#ccc" }}
            >
              <IconComponent
                name={sc.iconName}
                size={20}
                color={colorScheme === "dark" ? "#ccc" : "#000"}
              />
              <Text className="shortcut-label ">{sc.label}</Text>
            </Pressable>
          );
        })}
      </View> */}

      {/* <View className="mb-6">
        <Text className="text-xl font-bold text-black dark:text-white pb-2">
          Check Scams
        </Text>
        <ScrollView
          horizontal={true} // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
          contentContainerStyle={{ paddingHorizontal: 8 }} // Optional: Adds padding to the left and right
        > */}
      {/* Use flex-row and justifyContent to manage spacing */}
      {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            {shortcuts.map((sc) => {
              const IconComponent = sc.iconType;
              return (
                <Pressable
                  key={sc.key}
                  className="shortcut-btn"
                  onPress={() =>
                    router.push(`/(home-tabs)/checkScam?type=${sc.key}` as any)
                  }
                  android_ripple={{ color: "#ccc" }}
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 10, // Padding for better spacing within the button
                    borderWidth: 1, // Border width for the button
                    borderColor: colorScheme === "dark" ? "#ccc" : "#000", // Border color based on theme
                    borderRadius: 12, // Rounded corners for button
                    backgroundColor: colorScheme === "dark" ? "#333" : "#fff", // Button background color
                    flexShrink: 0, // Prevent button from shrinking if space is tight
                  }}
                >
                  <IconComponent
                    name={sc.iconName}
                    size={30} // Icon size
                    color={colorScheme === "dark" ? "#ccc" : "#000"}
                  />
                  <Text className="shortcut-label text-sm">{sc.label} </Text> */}
      {/* Button label */}
      {/* </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View> */}

      <View className="pb-2">
        <Pressable
          className={`border-2 ${colorScheme === "dark" ? "border-[#333]" : "border-[#ddd]"} ${colorScheme === "dark" ? "bg-gray-800" : "white"} rounded-xl p-4 mb-3 flex flex-row items-center`}
          onPress={() => router.push("/(home-tabs)/checkScam")}
        >

          <View className="flex-1 p-2">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-xl font-semibold text-black dark:text-white">
                Check for scams
              </Text>
              <FontAwesome6
                name="arrow-right"
                size={15}
                color={colorScheme === "light" ? "black" : "white"}
              />
            </View>
            <View className="flex flex-row items-center mt-2">
              <Text className="text-sm font-semibold text-blue-500">
                Spot something suspicious? Verify if it's a scam here!
              </Text>
            </View>
          </View>
        </Pressable>
      </View>

      <Text className="text-xl font-semibold text-black dark:text-white pb-2">
        In-person scams near me
      </Text>
      <HomeMap />
    </View>
  );
}
