
// 




import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface BlockingSetupModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
  type: 'call' | 'sms';
}

export default function BlockingSetupModal({ visible, onClose, onComplete, type }: BlockingSetupModalProps) {
  const handleComplete = () => {
    onComplete();
    onClose();
  };

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
          <Text className="text-2xl font-bold mb-8">
            Follow these steps to set up {isCall ? 'call' : 'SMS'} blocking
          </Text>

          <View className="space-y-4">
            <View className="flex-row">
              <Text className="text-base font-medium mr-2">1.</Text>
              <Text className="text-base flex-1">Go to Settings and scroll down to Apps</Text>
            </View>

            <View className="flex-row">
              <Text className="text-base font-medium mr-2">2.</Text>
              <Text className="text-base flex-1">Search for Phone</Text>
            </View>

            <View className="flex-row">
              <Text className="text-base font-medium mr-2">3.</Text>
              <Text className="text-base flex-1">Scroll down and tap Call blocking & identification</Text>
            </View>

            <View className="flex-row">
              <Text className="text-base font-medium mr-2">4.</Text>
              <Text className="text-base flex-1">Tap on ScamBusters</Text>
            </View>

            <View className="flex-row">
              <Text className="text-base font-medium mr-2">5.</Text>
              <Text className="text-base flex-1">Tap on {isCall ? 'Calls' : 'SMS'}</Text>
            </View>

            <View className="flex-row">
              <Text className="text-base font-medium mr-2">6.</Text>
              <Text className="text-base flex-1">Return to the ScamBusters app, and tap I have done this</Text>
            </View>
          </View>
        </View>

        {/* Bottom Button */}
        <View className="px-6 pb-8">
          <TouchableOpacity
            onPress={handleComplete}
            className="bg-blue-500 rounded-xl py-4 items-center"
          >
            <Text className="text-white text-base font-medium">I have done this</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}