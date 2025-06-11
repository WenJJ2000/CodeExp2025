import { Text, View } from "react-native";



export default function HomeStatsPanel({
    scamsChecked = 0,
    dollarsSaved = 0,
} : {
    scamsChecked?: number;
    dollarsSaved?: number;
}) {
    // Format the dollar value with commas and two decimal places
    function formatDollars(amount: number) {
        return "$" + amount.toLocaleString(undefined, { minimumFractionDigits: 2 });
    }

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
                backgroundColor: "#1d2129",
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 10,
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 2,
            }}
        >
            {/* Scams Checked */}
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ color: "#F44336", fontSize: 26, fontWeight: "bold" }}>
                    {scamsChecked}
                </Text>
                <Text style={{ color: "#fff", fontSize: 12, textAlign: "center" }}>
                    Number of{"\n"}Scams Checked
                </Text>
            </View>
            {/* Dollars Saved */}
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ color: "#2196F3", fontSize: 26, fontWeight: "bold" }}>
                    {formatDollars(dollarsSaved)}
                </Text>
                <Text style={{ color: "#fff", fontSize: 12, textAlign: "center" }}>
                    Dollars{"\n"}Saved
                </Text>
            </View>
        </View>
    );
}
