import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Text } from "~/components/ui/text";

// icons
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          headerRight: () => <ThemeToggle />,
        }}
      >
        <Tabs.Screen
          name="quiz"
          options={{
            title: "Quiz",
            headerTitle: () => (
              <View className="flex-row items-center gap-2">
                <Text className="text-lg font-semibold"></Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerShown: true,
            href: "/quiz",
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
          name="report"
          options={{
            title: "Report",
            headerTitle: () => (
              <View className="flex-row items-center gap-2">
                <Text className="text-lg font-semibold"></Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerShown: true,
            href: "/report",
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
          name="home"
          options={{
            title: "Home",
            headerTitle: () => (
              <View className="flex-row items-center gap-2">
                <Text className="text-lg font-semibold"></Text>
              </View>
            ),
            headerTitleAlign: "center",
            headerShown: true,
            href: "/home",
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
          name="forum"
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
            href: "/forum",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6
                name="comments-fill"
                size={size}
                color={color}
                style={{ marginBottom: -3 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
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
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() {}
