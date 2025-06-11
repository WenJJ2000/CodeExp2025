import "~/global.css";

import { Stack } from "expo-router";
import * as React from "react";
import { useEffect } from "react";
import { Appearance, Platform } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NotificationProvider } from "~/lib/useContext/useNotificationContext";
import HomeHeader from "~/components/custom-ui/home/home-header";
import SafeAreaViewForAndroid from "~/components/custom-ui/SafeAreaViewForAndriod";
import ForumPageHeader from "~/components/custom-ui/forum/forumpage-header";
import { getNotifications } from "~/firebase/NotiApi";
import { useAuth } from "~/lib/useContext/useAuthContext";

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
    <NotificationProvider>
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
                  <HomeHeader />
                </SafeAreaViewForAndroid>
              );
            },
          }}
        />
        <Stack.Screen
          name="notificationPage"
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
      </Stack>
    </NotificationProvider>
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
