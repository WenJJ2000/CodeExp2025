import { Text } from "~/components/ui/text";
import { useNotification } from "~/lib/useContext/useNotificationContext";
import AppHeader from "./app-header";
import { BellNotification } from "./home/bell-notification";
export default function QuizHeader() {
    const { notifications } = useNotification();
    return (
        <AppHeader
            leftChildren={<Text className="text-2xl font-bold ">Quiz</Text>}
            rightChildren={
                <>
                    <BellNotification />
                </>
            }
        />
    );
}