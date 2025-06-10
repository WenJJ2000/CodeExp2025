import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from "react-native";
import NotificationUI from "~/components/custom-ui/home/notification";
import { getLiveNotifications } from "~/firebase/ForumApi";
import { getNotifications } from "~/firebase/NotiApi";
import { liveUpdateUserReports } from "~/firebase/UserApi";
import { Notification, ScamReport } from "~/lib/types";
// import { NotificationType, getNotifications } from "~/firebase/NotiApi"; // update path as needed
import { useAuth } from "~/lib/useContext/useAuthContext";
dayjs.extend(relativeTime);

const shortcuts = [
  { key: "text", iconType: MaterialIcons, iconName: "email", label: "Text" },
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
    <View className={`flex-1 pt-14 px-6 bg-white dark:bg-black`}>
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Image
          source={{ uri: `data:image/jpeg;base64,${user?.profilePicture}` }}
          className="w-12 h-12 rounded-full mr-3 border-2 border-gray-300"
        />
        <Text className="text-2xl font-bold flex-1 text-black dark:text-white">
          Welcome {userName}!
        </Text>
      </View>

      {/* Counters */}
      <View className="flex-row justify-between mb-6">
        <CounterCircleButton
          count={postCount}
          label="Post"
          onPress={() => router.push("/(tabs)/(forum-tabs)")}
        />
        <CounterCircleButton
          count={verifiedCount}
          label="Verified"
          onPress={() => router.push("/(tabs)/(forum-tabs)")}
        />
        <CounterCircleButton
          count={notificationCount}
          label="Notification"
          onPress={() => router.push("/(tabs)/(forum-tabs)")}
        />
      </View>

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

      <View className="mb-6">
        <Text className="text-lg font-semibold mb-3 text-black dark:text-white">
          Check Scams
        </Text>
        <ScrollView
          horizontal={true} // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
          contentContainerStyle={{ paddingHorizontal: 8 }} // Optional: Adds padding to the left and right
        >
          {/* Use flex-row and justifyContent to manage spacing */}
          <View
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
                  <Text className="shortcut-label text-sm">{sc.label}</Text>{" "}
                  {/* Button label */}
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Notifications */}
      <Text className="text-lg font-semibold mb-3 text-black dark:text-white">
        Notifications
      </Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => <NotificationUI item={item} />}
      />
    </View>
  );
}

export function CounterCircleButton({
  count,
  label,
  onPress,
}: {
  count: number;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="flex-1 items-center">
      {/* Outer Circle */}
      <View className="w-24 h-24 rounded-full bg-border justify-center items-center shadow-lg">
        {/* Inner Circle with Text */}
        <View className="w-16 h-16 rounded-full bg-primary justify-center items-center">
          <Text className="text-lg font-medium text-white dark:text-black">
            {count}
          </Text>
        </View>
      </View>
      <Text className="mt-2 text-sm font-semibold text-black dark:text-gray-300">
        {label}
      </Text>
    </Pressable>
  );
}
