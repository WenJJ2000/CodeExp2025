import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { register } from '~/firebase/AuthApi';

export default function Screen() {
  const navigator = useRouter();

  const handleLogin = async () => {
    if (!email || !password || !username || !phone) {
      console.error('All fields are required');
      return;
    }
    try {
      // Call the login function from AuthApi
      await register(email, password, username);
      navigator.replace('./login');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show an alert)
      return;
    }
  };
  const handleCancel = () => {
    navigator.replace('../(pages)');
  };
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState<Number>();

  return (
    <SafeAreaView className="flex-1 bg-secondary/30">
      <Image
        source={require('~/assets/images/signup-background.png')}
        resizeMethod="resize"
        resizeMode="cover"
        className="w-full h-full absolute top-0 left-0 opacity-50"
        style={{ aspectRatio: 1 }}
      />
      <View className="flex-1 w-full justify-end items-start gap-3 p-6 mb-60">
        <Text className="text-6xl text-start font-bold mb-2">
          Create {'\n'}Account
        </Text>
        <Input
          className="w-full"
          placeholder="Username"
          autoCapitalize="none"
          autoComplete="username"
          textContentType="username"
          returnKeyType="next"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Input
          className="w-full"
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          returnKeyType="next"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Input
          className="w-full"
          placeholder="Password"
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry
          textContentType="password"
          returnKeyType="done"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Input
          className="w-full"
          placeholder="Singapore phone Number"
          autoCapitalize="none"
          autoComplete="tel-country-code"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          returnKeyType="done"
          maxLength={8}
          onChangeText={(text) => setPhone(Number(text))} // Convert string to number
          value={phone?.toString() || ''} // Convert number to string for input
        />
        <Button
          className="w-full"
          variant="default"
          size="lg"
          onPress={() => handleLogin()}
        >
          <Text className="text-lg dark:color-white">Sign up</Text>
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          onPress={() => handleCancel()}
        >
          <Text className="text-xl text-muted-foreground shadow-black shadow-md ">
            Cancel
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
