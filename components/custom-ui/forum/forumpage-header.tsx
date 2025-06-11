import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function ForumPageHeader() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  return (
    <View className="w-full flex-row justify-start items-center px-4  border-b-2 border-b-secondary">
      <Pressable
        className="p-2 "
        onPress={() =>
          router.canGoBack()
            ? router.back()
            : router.push("/(tabs)/(forum-tabs)")
        }
      >
        <FontAwesome6
          name="arrow-left"
          size={24}
          color={colorScheme === "light" ? "black" : "white"}
        />
      </Pressable>
    </View>
  );
}
