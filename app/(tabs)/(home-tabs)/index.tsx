import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, Text, View, useColorScheme } from 'react-native';



type NotificationType = {
  id: string;
  title: string;
  subtitle: string;
  linkText: string;
  time: string;
};

const shortcuts = [
  { key: 'text', icon: <MaterialIcons name="email" size={20} color="black" />, label: 'Text' },
  { key: 'image', icon: <FontAwesome5 name="camera" size={20} color="black" />, label: 'Image' },
  { key: 'number', icon: <FontAwesome5 name="phone" size={20} color="black" />, label: 'Number' },
  { key: 'app', icon: <Ionicons name="phone-portrait-outline" size={20} color="black" />, label: 'App' },
];

export default function Home() {
  const router = useRouter();
  const colorScheme = useColorScheme(); // 'light' or 'dark'

  const [postCount, setPostCount] = useState(2);
  const [verifiedCount, setVerifiedCount] = useState(1);
  const [notificationCount, setNotificationCount] = useState(5);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  
  // Helper to toggle icon colors based on theme
  const iconColor = colorScheme === 'dark' ? '#ccc' : '#000';

  return (
    <View className={`flex-1 pt-14 px-6 bg-white dark:bg-black`}>
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/65.jpg' }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <Text className="text-2xl font-bold flex-1 text-black dark:text-white">Welcome Lisa</Text>
      </View>

      {/* Counters */}
      <View className="flex-row justify-between mb-6">
        <CounterCircle count={postCount} label="Post" darkMode={colorScheme === 'dark'} />
        <CounterCircle count={verifiedCount} label="Verified" darkMode={colorScheme === 'dark'} />
        <CounterCircle count={notificationCount} label="Notification" darkMode={colorScheme === 'dark'} />
      </View>

      {/* Shortcuts */}
      <Text className="text-lg font-semibold mb-3 text-black dark:text-white">Shortcuts</Text>
      <View className="flex-row justify-between mb-6">
        {shortcuts.map((sc) => {
          const [pressed, setPressed] = useState(false);
          return (
            <Pressable
              key={sc.key}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
              style={{
                borderWidth: 1,
                borderColor: pressed
                  ? (colorScheme === 'dark' ? '#aaa' : '#333')
                  : (colorScheme === 'dark' ? '#666' : '#ccc'),
                borderRadius: 10,
                paddingVertical: 16,
                paddingHorizontal: 16,
                alignItems: 'center',
                width: 80,
                backgroundColor: pressed
                  ? (colorScheme === 'dark' ? '#333' : '#eee')
                  : 'transparent',
                transform: [{ scale: pressed ? 0.95 : 1 }],
              }}
              android_ripple={{ color: '#ccc' }}
            >
              {React.cloneElement(sc.icon, {
                color: colorScheme === 'dark' ? '#ccc' : 'black',
              })}
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                }}
              >
                {sc.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Notifications */}
      <Text className="text-lg font-semibold mb-3 text-black dark:text-white">Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 mb-3">
            <Text className="font-bold text-base mb-1 text-black dark:text-white">{item.title}</Text>
            <Text className="text-gray-600 dark:text-gray-300 font-semibold mb-1">{item.subtitle}</Text>
            <Text className="font-semibold text-blue-700 dark:text-blue-400">{item.linkText}</Text>
          </View>
        )}
      />
    </View>
  );
}

function CounterCircle({
  count,
  label,
  darkMode,
}: {
  count: number;
  label: string;
  darkMode?: boolean;
}) {
  return (
    <View className="items-center flex-1">
      <View
        className={`w-14 h-14 rounded-full justify-center items-center shadow-lg ${
          darkMode ? 'bg-blue-500' : 'bg-blue-500'
        }`}
      >
        <Text className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-white'}`}>{count}</Text>
      </View>
      <Text className={`mt-2 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-black'}`}>{label}</Text>
    </View>
  );
}
