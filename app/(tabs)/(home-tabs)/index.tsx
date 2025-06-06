import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View, useColorScheme } from 'react-native';
import { NotificationType, getNotifications } from '~/firebase/NotiApi'; // update path as needed
dayjs.extend(relativeTime);

const shortcuts = [
  { key: 'text', iconType: MaterialIcons, iconName: 'email', label: 'Text' },
  { key: 'image', iconType: FontAwesome5, iconName: 'camera', label: 'Image' },
  { key: 'number', iconType: FontAwesome5, iconName: 'phone', label: 'Number' },
  { key: 'app', iconType: Ionicons, iconName: 'phone-portrait-outline', label: 'App' },
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

  useEffect(() => {
    // Subscribes to realtime updates
    const unsubscribe = getNotifications(setNotifications);
    return () => unsubscribe();
  }, []);

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
        <CounterCircleButton count={postCount} label="Post" onPress={() => router.push('/(tabs)/(report-tabs)')} />
        <CounterCircleButton count={verifiedCount} label="Verified" onPress={() => router.push('/(tabs)/(report-tabs)')} />
        <CounterCircleButton count={notificationCount} label="Notification" onPress={() => router.push('/(tabs)/(report-tabs)')} />
      </View>


      {/* Shortcuts */}
      <Text className="text-lg font-semibold mb-3 text-black dark:text-white">Shortcuts</Text>
      <View className="flex-row justify-between mb-6">
        {shortcuts.map((sc) => {
          const IconComponent = sc.iconType;
          return (
            <Pressable
              key={sc.key}
              className="shortcut-btn"
              onPress={() => router.push(`/(home-tabs)/checkScam?type=${sc.key}` as any)}
              android_ripple={{ color: '#ccc' }}
            >
              <IconComponent
                name={sc.iconName}
                size={20}
                color={colorScheme === 'dark' ? '#ccc' : '#000'}
              />
              <Text className="shortcut-label " >
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
            {/*  // full date & time
            <Text className="font-semibold text-blue-700 dark:text-blue-400">
              {item.timestamp
                ? item.timestamp.toDate().toLocaleString()
                : 'No time'}
            </Text> */}

            {/* Relative time */}
            <Text className="font-semibold text-blue-700 dark:text-blue-400">
              {item.timestamp
                ? dayjs(item.timestamp.toDate()).fromNow()
                : "No time"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export function CounterCircleButton({
  count,
  label,
  onPress,
}: {
  count: number;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="flex-1 items-center">
      {/* Outer Circle */}
      <View className="w-24 h-24 rounded-full bg-border justify-center items-center shadow-lg">

        {/* Inner Circle with Text */}
        <View className="w-16 h-16 rounded-full bg-primary justify-center items-center">
          <Text className="text-lg font-medium text-white dark:text-black">
            {count}
          </Text>
        </View>

      </View>
      <Text className="mt-2 text-sm font-semibold text-black dark:text-gray-300">{label}</Text>
    </Pressable>
  );
}

