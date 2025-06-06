import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-4xl font-bold mb-2">Login</Text>
      <Text className="text-gray-500 text-base mb-8">Good to see you back! ❤️</Text>

      <TextInput
        placeholder="Email"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="bg-gray-100 rounded-lg px-4 py-3 mb-8"
      />

      <Pressable className="bg-blue-600 py-3 rounded-xl mb-4">
        <Text className="text-white text-center font-semibold">Sign in</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text className="text-center text-gray-500">Cancel</Text>
      </Pressable>
    </View>
  );
}
