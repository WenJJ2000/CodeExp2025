import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Href, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';

export default function ForumPageHeader({ href }: { href: Href }) {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  return (
    <View className="w-full flex-row justify-start items-center h-20 px-4 border-b-2 border-b-secondary">
      <Pressable className="p-2 " onPress={() => router.replace(href)}>
        <FontAwesome6
          name="arrow-left"
          size={24}
          color={colorScheme === 'light' ? 'black' : 'white'}
        />
      </Pressable>
    </View>
  );
}
