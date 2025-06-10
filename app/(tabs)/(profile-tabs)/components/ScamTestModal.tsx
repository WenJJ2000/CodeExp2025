// components/ScamTestModal.tsx
import { View, Text, Modal, Image, Pressable } from "react-native";
import React from "react";

interface Props {
  visible: boolean;
  type: "on" | "off";
  onClose: () => void;
}

const ScamTestModal = ({ visible, type, onClose }: Props) => {
  const isOn = type === "on";
  const imageSrc = isOn
    ? require("../../../../assets/images/scamTestOn.png")
    : require("../../../../assets/images/scamTestOff.png");
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 bg-blue-200 justify-center items-center p-4">
        <View className="bg-white rounded-2xl p-6 w-full items-center">
          <Image source={imageSrc} className="w-40 h-40 mb-4" resizeMode="contain" />
          <Text className="text-lg font-medium text-center mb-2">
            You have{" "}
            <Text className={isOn ? "text-green-600" : "text-red-600"}>
              {isOn ? "activated" : "deactivated"}
            </Text>{" "}
            the <Text className="text-blue-600 font-bold">scam test</Text>!
          </Text>
          <Text className="text-center text-gray-600 mb-6">
            We will randomly and periodically text or email you with non-malicious links to test
            your scam awareness. Be on your guard!
          </Text>
          <Pressable
            onPress={onClose}
            className="bg-green-600 px-6 py-2 rounded-full w-full items-center"
          >
            <Text className="text-white font-semibold">
              {isOn ? "I am ready" : "Acknowledge"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ScamTestModal;
