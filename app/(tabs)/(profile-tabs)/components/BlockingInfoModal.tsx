// components/BlockingInfoModal.tsx
import React from "react";
import { View, Text, Modal, TouchableOpacity, Switch } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface BlockingInfoModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'call' | 'sms';
  isEnabled: boolean;
  onToggle: () => void;
}

export default function BlockingInfoModal({ visible, onClose, type, isEnabled, onToggle }: BlockingInfoModalProps) {
  const isCall = type === 'call';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row justify-end p-4 pt-12">
          <TouchableOpacity onPress={onClose}>
            <FontAwesome name="times" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="px-6 flex-1">
          <Text className="text-2xl font-bold mb-4">
            About {isCall ? 'Call' : 'SMS'} Blocking
          </Text>
          <Text className="text-base mb-6">
            ScamBusters uses this feature to filter out suspicious {isCall ? 'phone calls' : 'messages'} from known scam sources. You can toggle it on or off anytime.
          </Text>

          {/* Toggle Switch */}
          <View className="flex-row justify-between items-center bg-gray-100 px-4 py-3 rounded-lg mb-4">
            <Text className="text-base font-medium">Enable {isCall ? 'Call' : 'SMS'} Blocking</Text>
            <Switch
              value={isEnabled}
              onValueChange={onToggle}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Close button */}
        <View className="px-6 pb-8">
          <TouchableOpacity
            onPress={onClose}
            className="bg-blue-500 rounded-xl py-4 items-center"
          >
            <Text className="text-white text-base font-medium">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
