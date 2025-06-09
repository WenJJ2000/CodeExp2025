import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";

import { login } from "~/firebase/AuthApi";
import { useAuth } from "~/lib/useContext/useAuthContext";
import SafeAreaViewForAndroid from "~/components/custom-ui/SafeAreaViewForAndriod";

export default function Screen() {
  const navigator = useRouter();
  const { setUser, setUid } = useAuth();
  const handleLogin = async () => {
    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }
    try {
      const x: any = await login(email, password);
      if (!x) {
        console.error("Login failed");
        return;
      }
      await SecureStore.setItemAsync("user", JSON.stringify(x));
      setUser(JSON.stringify(x));
      await SecureStore.setItemAsync("uid", x.id);
      setUid(x.id);

      navigator.navigate("../");
    } catch (error) {
      console.error("Login error:", error);
      return;
    }
  };
  const handleCancel = () => {
    navigator.replace("../(pages)");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaViewForAndroid className="flex-1 bg-secondary/30">
      <Image
        source={require("~/assets/images/login-background.png")}
        resizeMethod="resize"
        resizeMode="cover"
        className="w-full h-full  absolute top-0 left-0 opacity-50"
        style={{ aspectRatio: 1 }}
      />
      <View className="flex-1 w-full justify-end items-start gap-3 p-6 mb-60">
        <Text className="text-6xl text-center font-bold">Login</Text>
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
          onPress={() => handleLogin()}
        >
          <Text className="text-lg dark:color-white">Login</Text>
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          // onPress={() => handleCancel()}
          onPress={() => navigator.back()}
        >
          <Text className="text-xl text-muted-foreground shadow-black shadow-md ">
            Cancel
          </Text>
        </Button>
      </View>
    </SafeAreaViewForAndroid>
  );
}
