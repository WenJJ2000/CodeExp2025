import { Image, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/useContext/useAuthContext";
import AppHeader from "../app-header";
import { BellNotification } from "./bell-notification"; // Adjust the import path as necessary

export default function HomeHeader() {
    const { user, uid } = useAuth();
  
  return (
    <AppHeader
      leftChildren={
        <View className="flex-row items-center mb-6">
                <Image
                  source={{ uri: `data:image/jpeg;base64,${user?.profilePicture}` }}
                  className="w-8 h-8 rounded-full mr-3 border-2 border-gray-300"
                />
                <Text className="text-2xl font-bold flex-1 text-black dark:text-white">
                  Welcome {user?.username}
                </Text>
              </View>
      // <Text className="text-2xl font-bold ">Welcome</Text>
    }
      rightChildren={
        <>
          <BellNotification />
        </>
      }
    />
  );
}
