import { StyleSheet, Text, View } from 'react-native';
import AnimatedProgressBar from './AnimatedProgressBar';

const RecentQuiz = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.quizTitle}>Recent Quiz</Text>
            <Text style={styles.quizDescription}>Level 2 - Easy</Text>
            <AnimatedProgressBar
                progress={20} // Pass the progress value here
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4dd0f1', // Light red background
        padding: 16, // Padding inside the container
        borderRadius: 32, // More rounded corners
        width: '100%', // Full width
        alignItems: 'center', // Center-align content
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937', // Dark gray color
    },
    quizDescription: {
        fontSize: 14,
        color: '#6b7280', // Medium gray color
        marginVertical: 8, // Space between the title and the progress bar
    },
});

export default RecentQuiz;
