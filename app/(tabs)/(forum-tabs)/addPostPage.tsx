import { View } from "react-native";
import { Input } from "~/components/ui/input";

export default function AddPostPage() {
  return (
    <View className="flex-1 bg-secondary/30">
      <Input />
      <Input />
    </View>
  );
}
