import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Text>
        This is the quiz screen. You can add your quiz content here.
        {"\n"}You can use this space to display any quiz questions, options, and
        answers. Feel free to customize this screen as needed.
        {"\n"}For example, you can show multiple-choice questions, true/false
        questions, or any other type of quiz format that suits your application.
        {"\n"}You can also implement functionality to track user answers and
        provide feedback based on their responses.
      </Text>
    </View>
  );
}
