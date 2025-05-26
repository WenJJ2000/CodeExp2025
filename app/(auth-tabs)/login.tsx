import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
export default function Screen() {
  const navigator = useRouter();
  const handleLogin = () => {
    // Handle login logic here
    console.log("Login button pressed");
    navigator.replace("../");
  };
  const handleCancel = () => {
    // Handle cancel logic here
    console.log("Cancel button pressed");
    navigator.replace("../");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-secondary/30">
      <Image
        source={require("~/assets/images/login-background.png")}
        resizeMethod="resize"
        resizeMode="cover"
        className="w-full h-full  absolute top-0 left-0"
        style={{ aspectRatio: 1 }}
      />
      <View className="flex-1 w-full justify-end items-start gap-3 p-6 mb-60">
        <Text className="text-6xl text-center font-bold shadow-black shadow-md ">
          Login
        </Text>
        <Text className="text-xl text-center">Good to see you back!</Text>
        <Input
          className="w-full"
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          returnKeyType="next"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Input
          className="w-full"
          placeholder="Password"
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry
          textContentType="password"
          returnKeyType="done"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button
          className="w-full"
          variant="default"
          size="lg"
          onPress={handleLogin}
        >
          <Text className="text-lg dark:color-white">Login</Text>
        </Button>
        <Button
          variant={"link"}
          className="w-full"
          size="icon"
          onPress={handleCancel}
        >
          <Text className="text-xl text-muted-foreground shadow-black shadow-md ">
            Cancel
          </Text>
        </Button>
      </View>
    </View>
  );
}
