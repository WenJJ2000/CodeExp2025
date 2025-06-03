import "~/global.css";

import {
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import * as React from "react";
import { Appearance, Platform, SafeAreaView } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import ForumHeader, { Filters } from "~/components/custom-ui/forum-header";
import ForumPageHeader from "~/components/custom-ui/forum/forumpage-header";

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
  const router = useRouter();
  const { _queries, _filters } = useGlobalSearchParams();
  const searchQuery = _queries ? (_queries as string) : "";
  const filter = _filters ? (_filters as Filters) : "All";
  const setSearchQuery = (query: string) => {
    router.setParams({ _queries: query, _filters: filter });
  };
  const setFilter = (newFilter: Filters) => {
    router.setParams({ _queries: searchQuery, _filters: newFilter });
  };
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom",
        animationDuration: 200,
      }}
      initialRouteName="index"
    >
      <Stack.Screen
        name="forumPage"
        options={{
          headerShown: true,
          header: (props) => {
            return (
              <SafeAreaView>
                <ForumPageHeader />
              </SafeAreaView>
            );
          },
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: (props) => {
            return (
              <SafeAreaView>
                <ForumHeader
                  searchQuery={searchQuery}
                  filter={filter}
                  setFilter={setFilter}
                  setSearchQuery={setSearchQuery}
                />
              </SafeAreaView>
            );
          },
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
