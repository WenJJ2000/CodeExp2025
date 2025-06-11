import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export function SettingsButton({
  onPress,
  style,
}: {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const { isDarkColorScheme } = useColorScheme();

  const iconColor = isDarkColorScheme ? "white" : "black";

  const backgroundColor = isDarkColorScheme ? "#2f2f2f" : "#FFFFFF"; // dark grey vs light grey

  return (
    <Pressable
      onPress={onPress}
      // activeOpacity={0.7}
      style={[
        {
          backgroundColor,
          borderRadius: 9999, // rounded full
          //   padding: 6, // comfortable tap area
        },
        style,
      ]}
      className="w-18 h-18 border border-input bg-background p-4 rounded-full justify-center items-center "
    >
      <Ionicons name="settings-outline" color={iconColor} size={14} />
    </Pressable>
  );
}
