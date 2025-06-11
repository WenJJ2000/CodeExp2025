import { useRouter } from "expo-router";
import { Image, Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/useContext/useAuthContext";
import { useNotification } from "~/lib/useContext/useNotificationContext";
import { SettingsButton } from "../settingsButton";
import AppHeader from "./app-header";
import { BellNotification } from "./home/bell-notification";
export default function QuizHeader() {
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
                            className="w-12 h-12 rounded-full mr-1 border-2 border-gray-300 ml-1"
                        />
                    </Pressable>
                    <Text className="text-2xl font-bold ">{user?.username}</Text>
                </>
            }
            rightChildren={
                <>
                    {/* <ThemeToggle /> */}
                    <BellNotification />
                    <SettingsButton
                        onPress={() => {
                            router.push("/(tabs)/(profile-tabs)/settings");
                        }}
                        style={{ marginRight: 10, marginLeft: 5 }}
                    />
                </>
            }
        />
    );
}