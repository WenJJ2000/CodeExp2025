import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Href, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { SettingsButton } from '../settingsButton';
import AppHeader from './app-header';

export default function ProfileHeader({ href }: { href: Href }) {
    const { colorScheme } = useColorScheme();
    const router = useRouter();

    return (
        <AppHeader
            leftChildren={
                <Pressable className="p-2" onPress={() => router.replace(href)}>
                    <FontAwesome6
                        name="arrow-left"
                        size={24}
                        color={colorScheme === 'light' ? 'black' : 'white'}
                    />
                </Pressable>
            }
            rightChildren={
                <SettingsButton
                    onPress={() => {
                        router.push("/(tabs)/(profile-tabs)/settings");
                    }}
                    style={{ marginRight: 10, marginLeft: 5 }}
                />
            }
        />
    );
}
