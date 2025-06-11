import { StyleSheet, Text, View } from 'react-native';
import AnimatedProgressBar from './AnimatedProgressBar';

export function LectureContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.lectureTitle}>Lecture</Text>
      <Text style={styles.lectureDescription}>
        Learn more about how scams work
      </Text>
      <Text>Chapter 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4dd0f1', // Light red background
    padding: 16, // Padding inside the container
    borderRadius: 32, // More rounded corners
    width: '100%', // Full width
    alignItems: 'center', // Center-align content
  },
  lectureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937', // Dark gray color
  },
  lectureDescription: {
    fontSize: 14,
    color: '#6b7280', // Medium gray color
    marginVertical: 8, // Space between the title and the progress bar
  },
});
