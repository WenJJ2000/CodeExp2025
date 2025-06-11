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
    return "$" + amount.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }

  const isDarkMode = colorScheme === "dark";

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
        // backgroundColor: isDarkMode ? "#222" : "#fff",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
      className={colorScheme === "dark" ? "bg-gray-800" : "bg-blue-100"}
    >
      {/* Scams Checked */}
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text
          style={{
            color: "#4CAF50",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {scamsChecked}
        </Text>
        <Text
          style={{
            color: isDarkMode ? "#ddd" : "#333", // Adjust text color based on theme
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Number of{"\n"}Scams Checked
        </Text>
      </View>
      {/* Dollars Saved */}
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text
          style={{
            color: "#F44336",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {formatDollars(dollarsSaved)}
        </Text>
        <Text
          style={{
            color: isDarkMode ? "#ddd" : "#333", // Adjust text color based on theme
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Potential losses{"\n"}Prevented
        </Text>
      </View>
    </View>
  );
}
