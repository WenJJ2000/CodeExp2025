import { useState } from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/useContext/useAuthContext";
export default function UpdateUserPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUserName] = useState(user?.username || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || ""
  );

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4  shadow">
        <Text className="text-2xl font-bold">Update User</Text>
        <Text className="text-sm text-gray-500">
          Username: {user?.username}
        </Text>
      </View>
      <Text className="text-lg font-semibold">Update Email Page</Text>
      <Text className="text-sm text-gray-500 mt-2">
        This is where you can update your email address.
      </Text>
    </View>
  );
}
