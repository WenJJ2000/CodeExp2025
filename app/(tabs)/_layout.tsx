import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs, Redirect } from "expo-router";
import React from "react";
// import { auth } from "@/components/auth/firebaseConfig";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => <ThemeToggle />,
        headerTitle: "",
        headerShown: true,
      }}
      initialRouteName="(forum-tabs)"
    >
      <Tabs.Screen
        name="(quiz-tabs)"
        options={{
          title: "Quiz",
          href: "/(tabs)/(quiz-tabs)",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(report-tabs)"
        options={{
          title: "Report",
          headerTitle: "",
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
          headerTitle: "",
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
          headerTitle: "",
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
          headerTitle: "",
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
    </Tabs>
  );
}
