import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";
import { useNotification } from "~/lib/useContext/useNotificationContext";
import { useColorScheme } from "~/lib/useColorScheme";

export function BellNotification() {
  const router = useRouter();

  const { notifications } = useNotification();
  const { isDarkColorScheme } = useColorScheme();

  const iconColor = isDarkColorScheme ? "white" : "black";

  const backgroundColor = isDarkColorScheme ? "#2f2f2f" : "#FFFFFF"; // dark grey vs light grey
  return (
    <TouchableOpacity onPress={() => router.push("/notificationPage")}>
      <View
        className="w-18 h-18  min-h-fit border border-input bg-background p-3.5 rounded-full justify-center items-center "
        style={[{ backgroundColor, borderRadius: 9999 }]} // rounded full
      >
        <FontAwesome6 name="bell" className="" color={iconColor} size={14} />
      </View>
      <Badge
        variant="default"
        className=" items-center justify-center absolute -top-1 -right-1 p-1 w-6 h-6"
      >
        <Text className="text-xs dark:text-white">{notifications.length}</Text>
      </Badge>
    </TouchableOpacity>
  );
}
