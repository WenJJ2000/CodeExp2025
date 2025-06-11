import { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Animated, Easing } from 'react-native';


type BlockedType = 'email' | 'number' | 'website';

interface BlockedItem {
  id: string;
  type: BlockedType;
  value: string;
}

// Mock data - replace with your actual data source
const mockBlockedItems: BlockedItem[] = [
  { id: '1', type: 'number', value: '+23 456 789' },
  { id: '2', type: 'number', value: '+23 456 789' },
  { id: '3', type: 'number', value: '+23 456 789' },
  { id: '4', type: 'number', value: '+23 456 789' },
  { id: '5', type: 'number', value: '+23 456 789' },
  { id: '6', type: 'email', value: 'scam@example.com' },
  { id: '7', type: 'email', value: 'fake@scammer.com' },
  { id: '8', type: 'email', value: 'phishing@badsite.com' },
  { id: '9', type: 'website', value: 'malicious-site.com' },
  { id: '10', type: 'website', value: 'fake-bank.net' },
  { id: '11', type: 'website', value: 'scam-lottery.org' },
];

function TabButton({ 
  label, 
  isActive, 
  onPress 
}: { 
  label: string; 
  isActive: boolean; 
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-6 py-2 rounded-full ${
        isActive ? 'bg-blue-500' : 'bg-gray-200'
      }`}
    >
      <Text className={`text-base font-medium ${
        isActive ? 'text-white' : 'text-gray-600'
      }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function BlockedItemComponent({ 
  item, 
  index, 
  onUnblock 
}: { 
  item: BlockedItem; 
  index: number;
  onUnblock: (id: string) => void;
}) {
  return (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
      <View className="flex-row items-center flex-1">
        <Text className="text-base font-medium text-gray-800 mr-3">
          {index + 1}.
        </Text>
        <Text className="text-base text-gray-800 flex-1">
          {item.value}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onUnblock(item.id)}
        className="bg-red-500 px-3 py-1 rounded-md ml-2"
      >
        <Text className="text-white text-sm font-medium">Unblock</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function BlockedScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<BlockedType>('number');
  const [blockedItems, setBlockedItems] = useState<BlockedItem[]>(mockBlockedItems);
  const [lastUnblocked, setLastUnblocked] = useState<BlockedItem | null>(null);
  const [undoVisible, setUndoVisible] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

useEffect(() => {
  if (undoVisible) {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  } else {
    spinValue.setValue(0); // Reset when hidden
  }
}, [undoVisible]);

const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});



  const filteredItems = blockedItems.filter(item => item.type === activeTab);

  // const handleUnblock = (id: string) => {
  //   setBlockedItems(prev => prev.filter(item => item.id !== id));
  // };

  const handleUnblock = (id: string) => {
    const item = blockedItems.find(b => b.id === id);
    if (!item) return;

    setBlockedItems(prev => prev.filter(i => i.id !== id));
    setLastUnblocked(item);
    setUndoVisible(true);

    setTimeout(() => {
      setUndoVisible(false);
      setLastUnblocked(null);
    }, 3000);
  };

  const handleUndo = () => {
  if (!lastUnblocked) return;

  setBlockedItems(prev => [lastUnblocked!, ...prev]);
  setUndoVisible(false);
  setLastUnblocked(null);
};

  const getTabLabel = (type: BlockedType) => {
    switch (type) {
      case 'email': return 'Email';
      case 'number': return 'Number';
      case 'website': return 'Website';
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={onBack} className="mr-4">
            <FontAwesome name="arrow-left" size={20} color="#007AFF" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Blocked</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row space-x-3">
          <TabButton
            label="Email"
            isActive={activeTab === 'email'}
            onPress={() => setActiveTab('email')}
          />
          <TabButton
            label="Number"
            isActive={activeTab === 'number'}
            onPress={() => setActiveTab('number')}
          />
          <TabButton
            label="Website"
            isActive={activeTab === 'website'}
            onPress={() => setActiveTab('website')}
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="bg-white rounded-xl px-4 py-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <BlockedItemComponent
                key={item.id}
                item={item}
                index={index}
                onUnblock={handleUnblock}
              />
            ))
          ) : (
            <View className="py-8 items-center">
              <FontAwesome name="ban" size={48} color="#ccc" />
              <Text className="text-gray-500 text-lg mt-4">
                No blocked {getTabLabel(activeTab).toLowerCase()}s
              </Text>
              <Text className="text-gray-400 text-sm mt-2 text-center">
                {activeTab === 'number' 
                  ? 'Phone numbers you block will appear here'
                  : activeTab === 'email'
                  ? 'Email addresses you block will appear here'
                  : 'Websites you block will appear here'
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {undoVisible && (
        <View className="absolute bottom-5 left-0 right-0 px-4">
          <View className="flex-row items-center justify-between bg-blue-100 border border-blue-400 px-4 py-3 rounded-md">
            <Text className="text-blue-800 font-medium">Undo unblock?</Text>
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity onPress={handleUndo} className="bg-blue-500 px-3 py-1 rounded-md">
                <Text className="text-white text-sm font-medium">Undo</Text>
              </TouchableOpacity>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <FontAwesome name="spinner" size={20} color="#007AFF" />
              </Animated.View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}