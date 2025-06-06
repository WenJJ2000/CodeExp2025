import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-4xl font-bold mb-6">Create{"\n"}Account</Text>

      {/* Upload Icon */}
      <View className="self-center mb-8 border-2 border-dashed border-blue-500 rounded-full p-6">
        <Text className="text-blue-500 text-2xl">📷</Text>
      </View>

      <TextInput
        placeholder="Email"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Your number"
        keyboardType="phone-pad"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-8"
      />

      <Pressable className="bg-blue-600 py-3 rounded-xl mb-4">
        <Text className="text-white text-center font-semibold">Done</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text className="text-center text-gray-500">Cancel</Text>
      </Pressable>
    </View>
  );
}
