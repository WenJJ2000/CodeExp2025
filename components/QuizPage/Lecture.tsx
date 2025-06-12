import { StyleSheet, Text, View } from 'react-native';

export function LectureContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.lectureTitle}>Lecture</Text>
      <Text style={styles.lectureDescription}>
        Learn more about how scams work
      </Text>
      <View style={styles.divider} />
      <Text style={styles.chapter}>Chapter 1</Text>
      <Text style={styles.chapterTitle}>Email Scams (Phishing)</Text>
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
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  lectureDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#ececec',
    alignSelf: 'stretch',
    marginVertical: 12,
  },
  chapter: {
    fontSize: 16,
    color: '#3730a3',
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 4,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3730a3',
  },
});