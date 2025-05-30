import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { ForumTagVariant } from "~/lib/types";

export function ForumTag({ variant }: { variant: ForumTagVariant }) {
  const colorMap: Record<ForumTagVariant, string> = {
    SMS: "#2FC955",
    EMAIL: "#004BFE",
    PHONE: "#E4A719",
    SOCIAL_MEDIA: "#9747FF",
    WEBSITE: "#0CA8B9",
    MISINFORMATION: "#FF6B6B",
    IN_PERSON: "#FF6B6B",
    APP: "#FF6B6B",
    VERIFIED: "#F63C3C",
  };
  const textMap: Record<ForumTagVariant, string> = {
    SMS: "SMS",
    EMAIL: "Email",
    PHONE: "Phone",
    SOCIAL_MEDIA: "Social Media",
    WEBSITE: "Website",
    MISINFORMATION: "Misinformation",
    IN_PERSON: "In Person",
    APP: "App",
    VERIFIED: "Verified",
  };
  return (
    <View
      className="justify-center items-center p-2 rounded-lg"
      style={{ backgroundColor: colorMap[variant] }}
    >
      <Text className="text-secondary dark:text-white">
        {textMap[variant]}{" "}
      </Text>
    </View>
  );
}
