import { View } from "react-native";

export default function AppHeader({
  leftChildren,
  rightChildren,
}: {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}) {
  return (
    <View className="w-full flex-row justify-between items-center h-20 border-b-secondary px-4 py-4">
      <View className="flex-row justify-between items-center gap-2 w-[180px]">
        {leftChildren}
      </View>
      <View className="flex-row items-center justify-end gap-2 w-[200px]">
        {rightChildren}
      </View>
    </View>
  );
}
