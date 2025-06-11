import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";
import { useNotification } from "~/lib/useContext/useNotificationContext";

export function BellNotification() {
  const router = useRouter();

  const { notifications } = useNotification();
  return (
    <Pressable onPress={() => router.push("/notificationPage")}>
      <View className="w-18 h-18 border border-input bg-background p-4 rounded-full justify-center items-center ">
        <FontAwesome6 name="bell" className="" />
      </View>
      <Badge
        variant="default"
        className=" items-center justify-center absolute -top-1 -right-1 p-1 w-6 h-6"
      >
        <Text className="text-xs">{notifications.length}</Text>
      </Badge>
    </Pressable>
  );
}
