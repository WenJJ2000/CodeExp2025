import { useState } from "react";
import { View, Image, Pressable } from "react-native";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/useContext/useAuthContext";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { updateUserData } from "~/firebase/UserApi";

export default function UpdateUserPage() {
  const { user, uid, setUser } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || ""
  );
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 5, // Limit to one image
    });

    if (!result.canceled) {
      const base64Image = await convertImageToBase64(result.assets[0].uri);
      setProfilePicture(base64Image);
    }
  };
  const convertImageToBase64 = async (fileUri: string) => {
    try {
      const base64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return base64Data;
    } catch (error) {
      console.error("Error converting image to base64:", error);

      return "";
    }
  };
  const handleUpdate = () => {
    // Handle update logic here
    try {
      updateUserData(uid, {
        email,
        username,
        profilePicture,
      })
        .then((x) => {
          console.log("User updated successfully", JSON.stringify(x));
          setUser(JSON.stringify(x));
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          // Handle error (e.g., show a toast or alert)
        });
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error (e.g., show a toast or alert)
    }
  };
  return (
    <View className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4  shadow">
        <Text className="text-2xl font-bold">Update User</Text>
        <Text className="text-sm text-gray-500">
          Username: {user?.username}
        </Text>
      </View>
      {/* Form */}
      <View className="p-4 space-y-4 ">
        <View className="space-y-2 mb-4">
          <Text className="text-sm font-semibold mb-2">Profile Picture</Text>
          <Pressable onPress={pickImage} className="items-start">
            <Image
              source={{ uri: `data:image/jpeg;base64,${profilePicture}` }}
              className="w-24 h-24 rounded-full border-2 border-gray-300"
              style={{ resizeMode: "cover" }}
            />
          </Pressable>
        </View>
        <View className="space-y-2 mb-4">
          <Text className="text-sm font-semibol mb-2d">Email</Text>
          <Input
            value={email}
            onChangeText={(e) => setEmail(e)}
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Enter your email"
          />
        </View>
        <View className="space-y-2 mb-4">
          <Text className="text-sm font-semibold mb-2">Username</Text>
          <Input
            value={username}
            onChangeText={(e) => setUsername(e)}
            maxLength={12}
            autoComplete="username"
            textContentType="username"
            placeholder="Enter your username"
          />
        </View>

        <View className="flex-row justify-end">
          <Pressable
            onPress={handleUpdate}
            className="bg-blue-600 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">Update</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
