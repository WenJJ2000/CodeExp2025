import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Text>
        This is the report screen. You can add your report content here.
        {"\n"}You can use this space to display any relevant information or
        statistics related to your application or user activity.
        {"\n"}Feel free to customize this screen as needed.
        {"\n"}For example, you can show user activity logs, performance metrics,
        or any other data that might be useful for reporting purposes.
      </Text>
    </View>
  );
}
