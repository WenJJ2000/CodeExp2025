import { Text, View, useColorScheme } from "react-native";

export default function HomeStatsPanel({
    scamsChecked = 0,
    dollarsSaved = 0,
}: {
    scamsChecked?: number;
    dollarsSaved?: number;
}) {
    const colorScheme = useColorScheme();

    // Format the dollar value with commas and two decimal places
    function formatDollars(amount: number) {
        return "$" + amount.toLocaleString(undefined, { minimumFractionDigits: 0 });
    }

    const isDarkMode = colorScheme === "dark";

    return (
        <View
    style={{
        flexDirection: "column", // Change flexDirection to column to stack elements vertically
        justifyContent: "space-between",
        marginBottom: 24,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
        borderColor: isDarkMode ? "#333" : "#ddd",
        borderWidth: 2,
    }}
    className={colorScheme === "dark" ? "bg-gray-800" : "white"}
>
    {/* Title */}
    <Text className="text-xl font-bold text-black dark:text-white pb-2">
        Your Scam Impact
    </Text>
    
    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        {/* Scams Checked */}
        <View style={{ alignItems: "center", flex: 1 }}>
            <Text
                style={{
                    color: "#4CAF50",
                    fontSize: 40,
                    fontWeight: "bold",
                    marginBottom: 4,
                }}
            >
                {scamsChecked}
            </Text>
            <Text
                style={{
                    color: isDarkMode ? "#ddd" : "#333", // Adjust text color based on theme
                    fontSize: 8,
                    textAlign: "center",
                }}
            >
                Scams Checked
            </Text>
        </View>
        
        {/* Dollars Saved */}
        <View style={{ alignItems: "center", flex: 1 }}>
            <Text
                style={{
                    color: "#F44336",
                    fontSize: 40,
                    fontWeight: "bold",
                    marginBottom: 4,
                }}
            >
                {formatDollars(dollarsSaved)}
            </Text>
            <Text
                style={{
                    color: isDarkMode ? "#ddd" : "#333", // Adjust text color based on theme
                    fontSize: 8,
                    textAlign: "center",
                }}
            >
                Losses Prevented
            </Text>
        </View>
    </View>
</View>

    );
}
