// import { Image, StyleSheet, Text, View } from 'react-native';

// const UserHeader = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.avatarWrapper}>
//         <Image
//           source={{ uri: '../../lib/pictures/profile_icon.jpg' }}
//           style={styles.avatar}
//         />
//       </View>
//       <View>
//         <Text style={styles.greeting}>Hi Player,</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     padding: 16,
//   },
//   avatarWrapper: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ec4899', // fallback if gradient lib not used
//   },
//   avatar: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   greeting: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1f2937', // Tailwind's gray-900
//   },
// });

// export default UserHeader;

import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useAuth } from '~/lib/useContext/useAuthContext';


const UserHeader = () => {
  const colorScheme = useColorScheme();
  const [userName, setUserName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.username);
      setAvatar(userData.avatar);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.greeting, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>WELCOME BACK</Text>
        <Text style={[styles.name, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{userName}</Text>
      </View>
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${avatar}` }}
          style={styles.avatar}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f2937', // fallback if gradient lib not used
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  greeting: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937', // Tailwind's gray-900
    marginBottom: 4,
  },
  name: {
    fontSize: 25,
    fontWeight: '600',
    color: '#1f2937', // Tailwind's gray-900
  },
});

export default UserHeader;

