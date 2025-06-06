import { Pressable, View } from 'react-native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { MoonStar } from '~/lib/icons/MoonStar';
import { Sun } from '~/lib/icons/Sun';
import { useColorScheme } from '~/lib/useColorScheme';

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const backgroundColor = isDarkColorScheme ? '#2f2f2f' : '#FFFFFF'; // dark vs light grey


  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? 'light' : 'dark';
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  }

  return (
    <Pressable
      onPress={toggleColorScheme}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:opacity-70'
      style={[
        {
          backgroundColor,
          borderRadius: 9999,
          padding: 6,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <View className=' aspect-square pt-0.5 justify-center items-start web:px-5'>
        {isDarkColorScheme ? (
          <MoonStar className='text-foreground' size={25} strokeWidth={1.25} />
        ) : (
          <Sun className='text-foreground' size={25} strokeWidth={1.25} />
        )}
      </View>
    </Pressable>
  );
}
