// app/(report-tabs)/scam-report.tsx
import { Stack } from "expo-router";
import { View } from "react-native";
import ScamReportForm from "../../../components/scamReportForm";

export default function ScamReportScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Scam Report",         // sets the header title for the current screen.
                    headerBackTitle: "Back",      //  controls the text next to the back arrow.
                }}
            />
            <View className="flex-1 bg-white dark:bg-black">
                <ScamReportForm />
            </View>
        </>
    );
}
