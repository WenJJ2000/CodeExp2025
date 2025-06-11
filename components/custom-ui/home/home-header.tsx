import { Text } from "~/components/ui/text";
import AppHeader from "../app-header";
import { BellNotification } from "./bell-notification"; // Adjust the import path as necessary
import { useNotification } from "~/lib/useContext/useNotificationContext";
import { useAuth } from "~/lib/useContext/useAuthContext";
import { SettingsButton } from "~/components/settingsButton";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useRouter } from "expo-router";
import { Image, Pressable } from "react-native";
export default function HomeHeader() {
  const { notifications } = useNotification();
  const { user } = useAuth();
  const router = useRouter();
  return (
    <AppHeader
      leftChildren={
        <>
          <Pressable onPress={() => router.push("/(tabs)/(profile-tabs)")}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${user?.profilePicture}` }}
              className="w-12 h-12 rounded-full mr-3 border-2 border-gray-300 ml-4"
            />
          </Pressable>
          <Text className="text-2xl font-bold ">Welcome {user?.username}!</Text>
        </>
      }
      rightChildren={
        <>
          <ThemeToggle />
          <BellNotification />
          <SettingsButton
            onPress={() => {
              router.push("/(tabs)/(profile-tabs)/settings");
            }}
            style={{ marginLeft: 10 }}
          />
        </>
      }
    />
  );
}
