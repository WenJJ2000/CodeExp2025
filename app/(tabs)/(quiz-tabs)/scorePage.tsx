import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useLocalSearchParams, useRouter } from 'expo-router'; // Import useRouter
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';


const ScorePage = () => {
    const router = useRouter();
    const { totalScore, totalQuestions, correctAnswers } = useLocalSearchParams(); // Access params from the router
    const colorScheme = useColorScheme();
    const accuracy = ((Number(correctAnswers) / Number(totalQuestions)) * 100).toFixed(2);
    
    // Determine the score card color based on the performance
    let scoreColor = '#4CAF50'; // Default to green for a perfect score
    if (Number(correctAnswers) <= 1) {
        scoreColor = '#F44336'; // Red for 0 and 1
    } else if (Number(correctAnswers) <= 4) {
        scoreColor = '#FF9800'; // Orange/Yellow for 2, 3, 4
    }

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f9f9f9' }]}>
            {/* Header */}
            <Text style={[styles.header, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Quiz Completed!</Text>

            {/* Score Card */}
            <View style={[styles.scoreCard, { backgroundColor: scoreColor }]}>
                <Text style={styles.scoreTitle}>Your Score</Text>
                <Text style={styles.score}>
                    {correctAnswers} / {totalQuestions}
                </Text>
                <Text style={styles.accuracy}>Accuracy: {accuracy}%</Text>
            </View>

            {/* Performance Feedback */}
            <View style={styles.feedback}>
                {Number(correctAnswers) === 0 || Number(correctAnswers) === 1 ? (
                    <>
                        <Ionicons name="refresh" size={40} color="#F44336" />
                        <Text style={[styles.feedbackText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Don't worry, keep practicing! You’ll get there!</Text>
                    </>
                ) : (
                    <>
                        <Ionicons name="thumbs-up" size={40} color={scoreColor} />
                        <Text style={[styles.feedbackText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Great job! You scored {accuracy}%!</Text>
                    </>
                )}
            </View>

            {/* Correct vs Incorrect Breakdown */}
            {/* <View style={styles.breakdownCard}>
                <Text style={styles.breakdownTitle}>Performance Breakdown</Text>
                <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownText}>Correct Answers</Text>
                    <Text style={styles.breakdownValue}>{correctAnswers}</Text>
                </View>
                <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownText}>Incorrect Answers</Text>
                    <Text style={styles.breakdownValue}>{Number(totalQuestions) - Number(correctAnswers)}</Text>
                </View>
            </View> */}

            {/* Action Buttons */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/(tabs)/(quiz-tabs)')}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    scoreCard: {
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        maxWidth: 350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    scoreTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        marginBottom: 10,
    },
    score: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
    accuracy: {
        fontSize: 18,
        color: 'white',
        marginTop: 10,
    },
    feedback: {
        marginBottom: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    feedbackText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 10,
    },
    breakdownCard: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        width: '100%',
        maxWidth: 350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 30,
    },
    breakdownTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    breakdownText: {
        fontSize: 18,
        color: '#555',
    },
    breakdownValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 350,
    },
    homeButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ScorePage;
