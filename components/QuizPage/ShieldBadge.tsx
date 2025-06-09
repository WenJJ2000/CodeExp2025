import { StyleSheet, View } from 'react-native';
import AnimatedProgressBar from './AnimatedProgressBar'; // Adjust path accordingly
import Badge from './Badge'; // Adjust path accordingly

const BadgeSection = () => {
    return (
        <View>
            {/* Animated Progress Bar */}
            <AnimatedProgressBar progress={100} />

            {/* Shield Badge */}
            <Badge level={1} title="Introduction" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BadgeSection;
