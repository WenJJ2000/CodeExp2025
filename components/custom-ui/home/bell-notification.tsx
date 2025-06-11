import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Badge } from "~/components/ui/badge";

export function BellNotification() {
  return (
    <Pressable>
      <Badge variant="outline" className="p-4">
        <FontAwesome6 name="bell" />
      </Badge>
    </Pressable>
  );
}
