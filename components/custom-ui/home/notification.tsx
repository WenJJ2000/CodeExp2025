import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Notification as NotificationType } from "~/lib/types";
export default function Notification({ item }: { item: NotificationType }) {
  return (
    <View className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 mb-3">
      <Text className="font-bold text-base mb-1 text-black dark:text-white">
        {item.title}
      </Text>
      <Text className="text-gray-600 dark:text-gray-300 font-semibold mb-1">
        {item.subtitle}
      </Text>
      <Text className="font-semibold text-blue-700 dark:text-blue-400">
        {item.timestamp.toTimeString().slice(0, 5)}
      </Text>
    </View>
  );
}
