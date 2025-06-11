import { useRouter } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { viewNotification } from "~/firebase/NotiApi";
import { Notification as NotificationType } from "~/lib/types";
import { useAuth } from "~/lib/useContext/useAuthContext";
export default function NotificationUI({ item }: { item: NotificationType }) {
  const lastUpdated = new Date(new Date().getTime() - item.timestamp.getTime());
  const daysAgo = Math.ceil(lastUpdated.getTime() / (1000 * 60 * 60 * 24)) - 1;
  const hoursAgo = Math.ceil(lastUpdated.getTime() / (1000 * 60 * 60)) - 1;
  const minutesAgo = Math.ceil(lastUpdated.getTime() / (1000 * 60));
  const formattedTimeAgo =
    daysAgo > 0
      ? `${daysAgo}d`
      : hoursAgo > 0
      ? ` ${hoursAgo}h`
      : `${minutesAgo}m`;
  const router = useRouter();
  const { uid } = useAuth();
  return (
    <Pressable
      onPress={() => {
        viewNotification(uid, item.scamReportId);
        item.action !== "removed"
          ? router.push({
              pathname: "/forumPage",
              params: { scamReportId: item.scamReportId },
            })
          : {};
      }}
    >
      <View className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 mb-3 flex flex-row items-center">
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          className="w-14 h-14 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="font-bold text-base mb-1 text-black dark:text-white">
            {item.title}
          </Text>
          <Text className="text-gray-600 dark:text-gray-300 font-semibold mb-1">
            {item.subtitle}
          </Text>
          <Text className="font-semibold text-blue-700 dark:text-blue-400">
            {formattedTimeAgo} ago
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
