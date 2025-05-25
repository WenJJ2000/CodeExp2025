import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { register } from '../../../firebase/AuthApi';
import { useEffect } from 'react';

export default function Screen() {
  const testemail = 'wenjunjie14@gmail.com';
  const testPass = '123456789';
  const testUser = 'user1';

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Text>
        This is the Home screen. You can add your home content here.
        {'\n'}You can use this space to display any welcome message, app
        introduction, or any other content that you want to show on the home
        screen of your application.
      </Text>
    </View>
  );
}
