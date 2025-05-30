import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/useContext/useAuthContext";

export default function Screen() {
  const { setUser, setUid } = useAuth();
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Text>
        This is the profile screen. You can add your profile content here.
        {"\n"}You can use this space to display user information, settings, or
        any other profile-related content.
        {"\n"}Feel free to customize this screen as needed.
        {"\n"}For example, you can show user details, preferences, or any other
        relevant information that you want to display in the profile section of
        your application.
      </Text>
      <Pressable
        onPress={() => {
          setUser(null);
          setUid(null);
        }}
      >
        <Text className="text-lg text-primary">logout</Text>
      </Pressable>
    </View>
  );
}
