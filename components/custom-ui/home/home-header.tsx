import { Text } from "~/components/ui/text";
import AppHeader from "../app-header";
import { BellNotification } from "./bell-notification"; // Adjust the import path as necessary
import { useNotification } from "~/lib/useContext/useNotificationContext";
export default function HomeHeader() {
  const { notifications } = useNotification();
  return (
    <AppHeader
      leftChildren={<Text className="text-2xl font-bold ">Home</Text>}
      rightChildren={
        <>
          <BellNotification />
        </>
      }
    />
  );
}
