import { Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text } from "~/components/ui/text";
export function ForumReplyButton({ onPress }: { onPress: () => void }) {
  const { colorScheme } = useColorScheme();
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-2">
      <FontAwesome6
        name="reply"
        color={colorScheme == "light" ? "black" : "white"}
      />
      <Text className="text-base">Reply</Text>
    </Pressable>
  );
}
