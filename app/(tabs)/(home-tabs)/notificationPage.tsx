// import { FlatList, View } from "react-native";
// import { Text } from "~/components/ui/text";
// import { useNotification } from "~/lib/useContext/useNotificationContext";
// import NotificationUI from "~/components/custom-ui/home/notification";

// export default function NotificationPage() {
//   const { notifications } = useNotification();
//   if (notifications.length === 0) {
//     return (
//       <Text className="text-center text-lg mt-4">
//         No notifications available.
//       </Text>
//     );
//   }
//   return (
//     <View className="p-4">
//       <FlatList
//         data={notifications}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 80 }}
//         renderItem={({ item }) => <NotificationUI item={item} />}
//       />
//     </View>
//   );
// }

import { FlatList, StyleSheet, View } from "react-native";
import NotificationUI from "~/components/custom-ui/home/notification";
import { Text } from "~/components/ui/text";
import { useNotification } from "~/lib/useContext/useNotificationContext";

export default function NotificationPage() {
  const { notifications } = useNotification();

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text className="text-center text-lg mt-4">No notifications available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => <NotificationUI item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  flatListContent: {
    paddingBottom: 80,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
});

