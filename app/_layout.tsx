import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack, Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform, SafeAreaView, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { ThemeToggle } from "~/components/ThemeToggle";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "~/lib/useContext/useAuthContext";
import { ShowTabProvider } from "~/lib/useContext/useShowTabContext";

// icons

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
  const { user, uid } = useAuth();
  useEffect(() => {
    console.log("User in RootLayout:", user);
    console.log("UID in RootLayout:", uid);
  }, [user, uid]);
  // const [isSignIn, setIsSignIn] = useState(false);
  // useEffect(() => {
  //   const checkSignInStatus = async () => {
  //     try {
  //       const user = await SecureStore.getItemAsync("user");
  //       const uid = await SecureStore.getItemAsync("uid");
  //       console.log("User data from SecureStore:", user);
  //       console.log("User data from SecureStore:", user);
  //       setIsSignIn(!!user);
  //     } catch (error) {
  //       console.error("Error checking sign-in status:", error);
  //       setIsSignIn(false);
  //     }
  //   };
  //   checkSignInStatus();
  // }, []);
  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <AuthProvider>
        <ShowTabProvider>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <RootNavigator />
        </ShowTabProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
function RootNavigator() {
  const { uid, user } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!user || !uid}>
        <Stack.Screen
          name="(pages)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth-tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!!user && !!uid}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
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
