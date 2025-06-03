import { Ionicons } from "@expo/vector-icons";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
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
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[
                {
                    backgroundColor,
                    borderRadius: 9999, // rounded full
                    padding: 6, // comfortable tap area
                },
                style,
            ]}
        >
            <Ionicons name="settings-outline" size={25} color={iconColor} />
        </TouchableOpacity>
    );
}
