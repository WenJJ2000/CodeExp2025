import { FlatList, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useNotification } from "~/lib/useContext/useNotificationContext";
import NotificationUI from "~/components/custom-ui/home/notification";

export default function NotificationPage() {
  const { notifications } = useNotification();
  if (notifications.length === 0) {
    return (
      <Text className="text-center text-lg mt-4">
        No notifications available.
      </Text>
    );
  }
  return (
    <View className="p-4">
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => <NotificationUI item={item} />}
      />
    </View>
  );
}
