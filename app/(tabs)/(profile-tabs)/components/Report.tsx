import { View } from "react-native";
import { Text } from "~/components/ui/text";

interface ReportCardProps {
  title: string;
  date: string;
  variant?: "verified" | "pending";
}

export function ReportCard({ title, date, variant = "verified" }: ReportCardProps) {
  const cardStyle =
    variant === "verified"
      ? "bg-blue-500"
      : "bg-blue-300";

  return (
    <View className={`flex-row justify-between ${cardStyle} p-3 rounded-lg shadow-sm mb-2`}>
      <Text className="font-semibold">{title}</Text>
      <Text className="text-gray-500">{date}</Text>
    </View>
  );
}

export default ReportCard