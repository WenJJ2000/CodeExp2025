import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs, Redirect } from "expo-router";
import React from "react";
// import { auth } from "@/components/auth/firebaseConfig";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function TabLayout() {
  // if (!auth.currentUser) {
  //   return <Redirect href="/" />;
  // } else {
  //   // console.log('====================================');
  //   // console.log(auth.currentUser.email);
  //   // console.log('====================================');
  // }
  return (
    <Tabs
      initialRouteName="(home-tabs)"
      screenOptions={{
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Tabs.Screen
        name="(quiz-tabs)"
        options={{
          title: "Quiz",
          headerTitle: () => (
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold"></Text>
            </View>
          ),
          headerTitleAlign: "center",
          headerShown: true,
          href: "/(tabs)/(quiz-tabs)",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="book"
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(report-tabs)"
        options={{
          title: "Report",
          headerTitle: () => (
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold"></Text>
            </View>
          ),
          headerTitleAlign: "center",
          headerShown: true,
          href: "/(tabs)/(report-tabs)",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="triangle-exclamation"
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(home-tabs)"
        options={{
          title: "Home",
          headerTitle: () => (
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold"></Text>
            </View>
          ),
          headerTitleAlign: "center",
          headerShown: true,
          href: "/(tabs)/(home-tabs)",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="house"
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(forum-tabs)"
        options={{
          title: "Forum",
          headerTitle: () => (
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold"></Text>
            </View>
          ),
          headerTitleAlign: "center",
          headerLeft: () => null,
          headerShown: true,
          href: "/(tabs)/(forum-tabs)",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="comment"
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile-tabs)"
        options={{
          title: "Profile",
          headerTitle: () => (
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-semibold"></Text>
            </View>
          ),
          headerTitleAlign: "center",
          headerLeft: () => null,
          headerShown: true,
          href: "/(tabs)/(profile-tabs)",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="user"
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="+not-found"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
}
