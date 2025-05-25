import { router } from "expo-router";
import { useState } from "react";
import {
  Linking, Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";

export default function reportMainScreen() {
  const [infoVisible, setInfoVisible] = useState(false);
  const colorScheme = useColorScheme(); // returns 'light' or 'dark'

  const isDark = colorScheme === "dark";

  return (
    <View className={`flex-1 px-6 pt-10 ${isDark ? "bg-black" : "bg-white"}`}>
      {/* Header */}
      <Text className={`text-4xl font-bold ${isDark ? "text-white" : "text-black"}`}>
        Report
      </Text>

      {/* Subheader + Info */}
      <View className="flex-row items-center mt-4 mb-6">
        <Text className={`text-lg font-medium mr-2 ${isDark ? "text-white" : "text-black"}`}>
          Submit a Report
        </Text>
        <TouchableOpacity onPress={() => setInfoVisible(true)}>
          <Text className={`text-lg ${isDark ? "text-white" : "text-black"}`}>ⓘ</Text>
        </TouchableOpacity>
      </View>

      {/* Submit a scam report */}
      <TouchableOpacity
        className={`border rounded-xl py-5 px-4 mb-4 items-center ${
          isDark ? "border-white" : "border-black"
        }`}
        onPress={() => router.push("/scamReport")}
      >
        <Text className={`text-lg ${isDark ? "text-white" : "text-black"}`}>
          Submit a scam report
        </Text>
      </TouchableOpacity>

      {/* File an official police report */}
      <TouchableOpacity
        className={`border rounded-xl py-5 px-4 items-center ${
          isDark ? "border-white" : "border-black"
        }`}
        onPress={() =>   Linking.openURL("https://eservices1.police.gov.sg/phub/eservices/landingpage/police-report")}
      >
        <Text className={`text-lg ${isDark ? "text-white" : "text-black"}`}>
          File an official police report
        </Text>
      </TouchableOpacity>

      {/* Info Modal */}
      <Modal
        transparent
        visible={infoVisible}
        animationType="fade"
        onRequestClose={() => setInfoVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-6">
          <View className="bg-white dark:bg-neutral-900 rounded-2xl px-6 pb-6 pt-12 w-full max-w-md relative shadow-lg">
            {/* Floating Icon */}
            <View className="absolute -top-8 self-center bg-blue-600 w-16 h-16 rounded-full justify-center items-center shadow-md">
              <Text className="text-white text-2xl font-bold">i</Text>
            </View>

            <Text className="text-xl font-bold text-center text-black dark:text-white mb-3">
              Submit a Report
            </Text>
            <Text className="text-center text-black dark:text-gray-300 mb-6">
              Submitting a scam report is not the same as filing an official police report. If you
              have fallen victim to a scam, please file an e-report with the police by selecting
              "File an Official Report."
            </Text>
            <Pressable
              className="bg-indigo-100 dark:bg-indigo-700 px-6 py-3 rounded-xl self-center"
              onPress={() => setInfoVisible(false)}
            >
              <Text className="text-indigo-900 dark:text-white font-medium text-base">
                I Understand
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
