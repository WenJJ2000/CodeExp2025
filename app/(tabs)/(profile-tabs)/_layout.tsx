import "~/global.css";

import { Stack } from "expo-router";
import * as React from "react";
import { Appearance, Platform } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { ForumPageHeader } from "~/components/custom-ui/forum/forumpage-header";
import SafeAreaViewForAndroid from "~/components/custom-ui/SafeAreaViewForAndriod";
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

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: (props) => {
            return (
              <SafeAreaViewForAndroid>
                <ForumPageHeader />
              </SafeAreaViewForAndroid>
            );
          },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          header: (props) => {
            return (
              <SafeAreaViewForAndroid>
                <ForumPageHeader />
              </SafeAreaViewForAndroid>
            );
          },
        }}
      />
      <Stack.Screen
        name="allReportsPage"
        options={{
          title: "All Reports",
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
    </Stack>
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
