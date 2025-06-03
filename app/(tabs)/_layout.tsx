import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, Tabs, useGlobalSearchParams } from "expo-router";
import { Pressable, SafeAreaView, TouchableOpacity, View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import ForumHeader, { Filters } from "~/components/custom-ui/forum-header";
import { SettingsButton } from "~/components/settingsButton";

export default function TabLayout() {
  function onSettingsPress() {
    // Handle settings press: navigate or open modal
    console.log("Settings pressed");
  }
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
    <Tabs
      screenOptions={{
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 20,
            }}
          >
            <ThemeToggle />
            <SettingsButton
              onPress={onSettingsPress}
              style={{ marginLeft: 10 }}
            />
          </View>
        ),
      }}
      initialRouteName="(forum-tabs)"
    >
      <Tabs.Screen
        name="(quiz-tabs)"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="book" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  router.navigate("/(tabs)/(quiz-tabs)");
                }}
              >
                {props.children}
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="(report-tabs)"
        options={{
          title: "Report",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="triangle-exclamation"
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
          tabBarButton: (props) => (
            <>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  router.navigate("/(tabs)/(report-tabs)");
                }}
              >
                {props.children}
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="(home-tabs)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="house"
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
          tabBarButton: (props) => (
            <>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  router.navigate("/(tabs)/(home-tabs)");
                }}
              >
                {props.children}
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="(forum-tabs)"
        options={{
          title: "Forum",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="comment"
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
          tabBarButton: (props) => (
            <>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  router.navigate("/(tabs)/(forum-tabs)");
                }}
              >
                {props.children}
              </TouchableOpacity>
            </>
          ),
          header: () => {
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
      <Tabs.Screen
        name="(profile-tabs)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="user"
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
          tabBarButton: (props) => (
            <>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  router.navigate("/(tabs)/(profile-tabs)");
                }}
              >
                {props.children}
              </TouchableOpacity>
            </>
          ),
        }}
      />
    </Tabs>
  );
}
