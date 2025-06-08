import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/useContext/useAuthContext";
import * as SercureStore from "expo-secure-store";

export default function Screen() {
  const navigator = useRouter();
  const { user, uid } = useAuth();
  useEffect(() => {
    const checkUser = async () => {
      const user = await SercureStore.getItemAsync("user");
      const uid = await SercureStore.getItemAsync("uid");
      if (user && uid) {
        navigator.replace("../(tabs)/(home-tabs)");
      }
    };
    checkUser();
    // console.log("User in Index:", !!user);
    // console.log("UID in Index:", !!uid);
  }, [user, uid, navigator]);
  return (
    <SafeAreaView className="flex-1 justify-center items-center gap-1 p-6 bg-secondary/30">
      <Image
        source={require("~/assets/images/icon2.png")}
        resizeMethod="resize"
        resizeMode="contain"
        className="w-150 h-150 mt-20"
        style={{ aspectRatio: 1 }}
      />
      <View className="flex-1 justify-center items-center gap-5 p-6">
        <Text className="text-6xl text-center ">ScamBusters</Text>
        <Text className="text-lg text-center text-muted-foreground">
          Detect, Report, and Defeat Online Threats
        </Text>
        <Button
          className="w-full"
          variant="default"
          size="lg"
          onPress={() => {
            navigator.replace("../(auth-tabs)/signup");
          }}
        >
          <Text className="text-lg dark:color-white">Let's get started</Text>
        </Button>
        <View className="flex-row items-center gap-2 w-full">
          <Text className="text-md text-muted-foreground">
            I already have an account
          </Text>
          <Button
            variant="default"
            className="w-12 h-12 p-1 m-1 "
            size="icon"
            onPress={() => {
              navigator.push("../(auth-tabs)/login");
            }}
          >
            <FontAwesome6 name="arrow-right" size={16} color="white" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
