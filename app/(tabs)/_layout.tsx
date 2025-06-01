import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, Tabs } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
