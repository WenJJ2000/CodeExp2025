import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: '../../lib/pictures/profile_icon.jpg' }}
          style={styles.avatar}
        />
      </View>
      <View>
        <Text style={styles.greeting}>Hi Player,</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ec4899', // fallback if gradient lib not used
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937', // Tailwind's gray-900
  },
});

export default UserHeader;
