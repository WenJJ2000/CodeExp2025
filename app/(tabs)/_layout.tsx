import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { SettingsButton } from "~/components/settingsButton";
import { useAuth } from "~/lib/useContext/useAuthContext";

export default function TabLayout() {
  const { setUid, setUser } = useAuth();
  function onSettingsPress() {
    // Handle settings press: navigate or open modal
    console.log("Settings pressed");
    router.push("/settings");
    setUid("");
    setUser("");
  }

  return (
    <Tabs
      initialRouteName="(home-tabs)"
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
        tabBarStyle: {
          paddingTop: 15, // Add padding to the top of the tab bar
        },
      }}
    >
      <Tabs.Screen
        name="(quiz-tabs)"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="book"
              size={size}
              color={color}
              style={{
                // marginBottom: -3,
                justifyConent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
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
                  router.navigate("/(tabs)/(quiz-tabs)");
                }}
              >
                {props.children}
              </TouchableOpacity>
            </>
          ),
          headerShown: false,
          tabBarLabelPosition: "below-icon",
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
              style={{
                // marginBottom: -3,
                justifyConent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
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
          tabBarLabelPosition: "below-icon",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(report-tabs)"
        options={{
          title: "Report",
          headerShown: false,
          href: null,
          tabBarLabelPosition: "below-icon",
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
              // style={{ marginBottom: -3 }}
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
          headerShown: false,
          tabBarLabelPosition: "below-icon",
        }}
      />
      <Tabs.Screen
        name="(profile-tabs)"
        options={{
          title: "Profile",
          href: null,
          tabBarLabelPosition: "below-icon",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
