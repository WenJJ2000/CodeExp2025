import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import { useAuth } from "~/lib/useContext/useAuthContext";
import BlockedScreen from "./components/BlockedScreen";
import BlockingInfoModal from "./components/BlockingInfoModal";
import BlockingSetupModal from "./components/BlockingSetupModal";
import ScamTestModal from "./components/ScamTestModal";
const router = useRouter();

function SettingsItem({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
}) {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        !isDarkColorScheme ? "bg-gray-200" : "bg-gray-700"
      } rounded-xl px-4 py-4 flex-row justify-between items-center mb-2`}
    >
      <View className="flex-row items-center space-x-4">
        <FontAwesome
          name={icon as any}
          size={20}
          color={isDarkColorScheme ? "white" : "black"}
        />
        <Text className="text-base dark:text-white "> {label}</Text>
      </View>
      <FontAwesome
        name="angle-right"
        size={20}
        color={isDarkColorScheme ? "white" : "black"}
      />
    </TouchableOpacity>
  );
}

function SetupButton({
  icon,
  label,
  onPress,
  isSetup,
  onInfoPress,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
  isSetup?: boolean;
  onInfoPress?: () => void;
}) {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        !isDarkColorScheme ? "bg-gray-200" : "bg-gray-700"
      } rounded-xl px-4 py-4 flex-row justify-between items-center mb-2`}
    >
      <View className="flex-row items-center space-x-4">
        <FontAwesome
          name={icon as any}
          size={20}
          color={isDarkColorScheme ? "white" : "black"}
        />
        <Text className="text-base dark:text-white"> {label}</Text>
      </View>
      <View className="flex-row items-center space-x-2">
        {isSetup && (
          <TouchableOpacity
            onPress={onInfoPress}
            className="bg-blue-500 rounded-full w-8 h-8 items-center justify-center"
          >
            <FontAwesome name="info" size={16} color="white" />
          </TouchableOpacity>
        )}
        {!isSetup && (
          <View className="bg-blue-500 px-3 py-1 rounded-md">
            <Text className="text-white text-sm font-medium">Set up</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const [scamTestEnabled, setScamTest] = useState(true);
  const [locationServicesEnabled, setLocationServices] = useState(true);
  const [scamCallSetup, setScamCallSetup] = useState(false);
  const [scamSMSSetup, setScamSMSSetup] = useState(false);
  const [scamCallActive, setScamCallActive] = useState(false);
  const [scamSMSActive, setScamSMSActive] = useState(false);
  const [showBlockedScreen, setShowBlockedScreen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadToggles = async () => {
      useEffect(() => {
        navigation.setOptions({ headerShown: true, title: "Settings" });
      }, [navigation]);

      const scamTestSaved = await AsyncStorage.getItem("scamTestToggle");
      const locationSaved = await AsyncStorage.getItem(
        "locationServicesToggle"
      );
      const scamCallSaved = await AsyncStorage.getItem("scamCallSetup");
      const scamSMSSaved = await AsyncStorage.getItem("scamSMSSetup");
      const scamCallActiveSaved = await AsyncStorage.getItem("scamCallActive");
      const scamSMSActiveSaved = await AsyncStorage.getItem("scamSMSActive");
      // AsyncStorage.clear();
      // navigation.setOptions({ headerShown: false });

      if (scamTestSaved !== null) setScamTest(JSON.parse(scamTestSaved));
      if (locationSaved !== null)
        setLocationServices(JSON.parse(locationSaved));
      if (scamCallSaved !== null) setScamCallSetup(JSON.parse(scamCallSaved));
      if (scamSMSSaved !== null) setScamSMSSetup(JSON.parse(scamSMSSaved));
      if (scamCallActiveSaved !== null)
        setScamCallActive(JSON.parse(scamCallActiveSaved));
      if (scamSMSActiveSaved !== null)
        setScamSMSActive(JSON.parse(scamSMSActiveSaved));
    };
    loadToggles();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Settings", // 👈 Hide the arrow-only back button
    });
  }, [navigation]);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"on" | "off">("on");
  const [blockingSetupModalVisible, setBlockingSetupModalVisible] =
    useState(false);
  const [blockingSetupType, setBlockingSetupType] = useState<"call" | "sms">(
    "call"
  );
  const [blockingInfoModalVisible, setBlockingInfoModalVisible] =
    useState(false);
  const [blockingInfoType, setBlockingInfoType] = useState<"call" | "sms">(
    "call"
  );

  const toggleScamTest = async () => {
    const newValue = !scamTestEnabled;
    setScamTest(newValue);
    await AsyncStorage.setItem("scamTestToggle", JSON.stringify(newValue));
    setModalType(newValue ? "on" : "off");
    setModalVisible(true);
  };

  const toggleLocationServices = async () => {
    const newValue = !locationServicesEnabled;
    setLocationServices(newValue);
    await AsyncStorage.setItem(
      "locationServicesToggle",
      JSON.stringify(newValue)
    );
  };

  const handleSMSSetupComplete = async () => {
    setScamSMSSetup(true);
    setScamSMSActive(true);
    await AsyncStorage.setItem("scamSMSSetup", JSON.stringify(true));
    await AsyncStorage.setItem("scamSMSActive", JSON.stringify(true));
  };

  const handleCallSetupComplete = async () => {
    setScamCallSetup(true);
    setScamCallActive(true);
    await AsyncStorage.setItem("scamCallSetup", JSON.stringify(true));
    await AsyncStorage.setItem("scamCallActive", JSON.stringify(true));
  };

  const showSMSSetup = () => {
    setBlockingSetupType("sms");
    setBlockingSetupModalVisible(true);
  };

  const showCallSetup = () => {
    setBlockingSetupType("call");
    setBlockingSetupModalVisible(true);
  };

  const handleBlockingSetupComplete = () => {
    if (blockingSetupType === "sms") {
      handleSMSSetupComplete();
    } else {
      handleCallSetupComplete();
    }
  };

  const toggleScamCallActive = async () => {
    const newValue = !scamCallActive;
    setScamCallActive(newValue);
    await AsyncStorage.setItem("scamCallActive", JSON.stringify(newValue));
  };

  const toggleScamSMSActive = async () => {
    const newValue = !scamSMSActive;
    setScamSMSActive(newValue);
    await AsyncStorage.setItem("scamSMSActive", JSON.stringify(newValue));
  };

  const showCallInfo = () => {
    setBlockingInfoType("call");
    setBlockingInfoModalVisible(true);
  };

  const showSMSInfo = () => {
    setBlockingInfoType("sms");
    setBlockingInfoModalVisible(true);
  };

  const getCallLabel = () => {
    if (!scamCallSetup) return "Scam call blocking not set up";
    return scamCallActive
      ? "Scam call blocking is active"
      : "Scam call blocking is NOT active";
  };

  const getSMSLabel = () => {
    if (!scamSMSSetup) return "Scam SMS blocking not set up";
    return scamSMSActive
      ? "Scam SMS blocking is active"
      : "Scam SMS blocking is NOT active";
  };

  if (showBlockedScreen) {
    return <BlockedScreen onBack={() => setShowBlockedScreen(false)} />;
  }
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const { setUser, setUid } = useAuth();
  const backgroundColor = isDarkColorScheme ? "#2f2f2f" : "#FFFFFF"; // dark vs light grey

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? "light" : "dark";
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  }

  return (
    <ScrollView className="flex-1  px-4 pt-4">
      {/* <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">

        <FontAwesome name="arrow-left" size={24} />
      </TouchableOpacity> */}

      <Text className="text-2xl font-bold mb-4  dark:text-white">Settings</Text>

      <Text className="text-sm text-gray-500 mb-2  dark:text-white">
        Account Settings
      </Text>
      <SettingsItem
        icon="user"
        label="Update Account"
        onPress={() => router.push("/(tabs)/(profile-tabs)/updateUserPage")}
      />
      <SettingsItem icon="lock" label="Change password" />

      <Text className="text-sm text-gray-500 mt-4 mb-2  dark:text-white">
        Accessibility
      </Text>
      <SettingsItem icon="font" label="Text size" />
      <SettingsItem icon="eye" label="Colour correction" />
      {/* <SettingsItem icon="sun-o" label="Light theme" />
      <SettingsItem icon="moon-o" label="Dark theme" /> */}
      <View
        className={`${
          !isDarkColorScheme ? "bg-gray-200" : "bg-gray-700"
        } rounded-xl px-4 py-4 mb-2`}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-4">
            <FontAwesome
              name={isDarkColorScheme ? "moon-o" : "sun-o"}
              size={20}
              color={isDarkColorScheme ? "white" : "black"}
            />
            <Text className="text-base  dark:text-white ">
              {" "}
              {isDarkColorScheme ? "Dark" : "Light"} Theme
            </Text>
          </View>
          <Switch
            value={isDarkColorScheme}
            onValueChange={toggleColorScheme}
            trackColor={{ false: "#ccc", true: "#4CAF50" }}
            thumbColor={isDarkColorScheme ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>
      <Text className="text-sm text-gray-500 mt-4 mb-2  dark:text-white">
        About
      </Text>
      <SettingsItem icon="file-text" label="ScamBusters rules" />
      <SettingsItem icon="shield" label="Privacy policy" />
      <SettingsItem icon="balance-scale" label="User agreement" />
      <SettingsItem icon="info-circle" label="Acknowledgements" />

      <Text className="text-sm text-gray-500 mt-4 mb-2">Security</Text>
      <View
        className={`${
          !isDarkColorScheme ? "bg-gray-200" : "bg-gray-700"
        } rounded-xl px-4 py-4 mb-2`}
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-semibold  dark:text-white">
            Scam test
          </Text>
          <Switch
            value={scamTestEnabled}
            onValueChange={toggleScamTest}
            trackColor={{ false: "#ccc", true: "#4CAF50" }}
            thumbColor={scamTestEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
        <Text className="text-xs text-gray-500 mt-1  dark:text-white">
          Enabling this will allow us to send you non-malicious scams to test
          your awareness.
        </Text>
      </View>

      <View
        className={`${
          !isDarkColorScheme ? "bg-gray-200" : "bg-gray-700"
        } rounded-xl px-4 py-4 mb-2`}
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-semibold  dark:text-white">
            Location services
          </Text>
          <Switch
            value={locationServicesEnabled}
            onValueChange={toggleLocationServices}
            trackColor={{ false: "#ccc", true: "#4CAF50" }}
            thumbColor={locationServicesEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
        <Text className="text-xs text-gray-500  dark:text-white mt-1">
          App will show you regional scams depending on your city
        </Text>
      </View>

      <SettingsItem
        icon="ban"
        label="Blocked"
        onPress={() => setShowBlockedScreen(true)}
      />
      <Text className="text-xs text-gray-500 dark:text-white mb-4 px-1">
        View all the numbers, email, and websites you've blocked
      </Text>

      <SetupButton
        icon="phone"
        label={getCallLabel()}
        isSetup={scamCallSetup}
        onPress={scamCallSetup ? undefined : showCallSetup}
        onInfoPress={showCallInfo}
      />

      <SetupButton
        icon="comment"
        label={getSMSLabel()}
        isSetup={scamSMSSetup}
        onPress={scamSMSSetup ? undefined : showSMSSetup}
        onInfoPress={showSMSInfo}
      />

      <ScamTestModal
        visible={modalVisible}
        type={modalType}
        onClose={() => setModalVisible(false)}
      />

      <BlockingSetupModal
        visible={blockingSetupModalVisible}
        onClose={() => setBlockingSetupModalVisible(false)}
        onComplete={handleBlockingSetupComplete}
        type={blockingSetupType}
      />

      <BlockingInfoModal
        visible={blockingInfoModalVisible}
        onClose={() => setBlockingInfoModalVisible(false)}
        type={blockingInfoType}
        isEnabled={blockingInfoType === "call" ? scamCallActive : scamSMSActive}
        onToggle={
          blockingInfoType === "call"
            ? toggleScamCallActive
            : toggleScamSMSActive
        }
      />
      {/* Logout Button */}
      {/* <Pressable
        onPress={() => {
          setUser("");
          setUid("");
        }}
        className="mt-8"
      >
        <View className="flex-row items-center space-x-2 mb-8">
          <MaterialIcons name="logout" size={24} color="red" />
          <Text className="text-red-500 font-bold text-sm">Logout</Text>
        </View>
      </Pressable> */}
      <Pressable
        onPress={() => {
          setUser("");
          setUid("");
        }}
        className={`${!isDarkColorScheme ? "bg-red-700" : "bg-red-700"
          } rounded-xl px-4 py-4 flex-row justify-between items-center mb-2 mt-8`}
      >
        <View className="flex-row items-center space-x-4">
          <MaterialIcons name="logout" size={24} color="white"  style={{paddingRight: 2}}/>
          <Text className="text-white font-bold text-sm ">Logout</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}
