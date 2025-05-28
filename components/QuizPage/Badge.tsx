import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);
interface LevelBadgeProps {
  level: number;
  title: string;
  onPrev?: () => void;
  onNext?: () => void;
}

const LevelBadge = ({ level, title, onPrev, onNext }: LevelBadgeProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton} onPress={onPrev}>
        <ChevronLeft size={24} color="#A0AEC0" />
      </TouchableOpacity>

      <View style={styles.badgeWrapper}>
        <Svg width={128} height={144} viewBox="0 0 128 144">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#93C5FD" />
              <Stop offset="1" stopColor="#3B82F6" />
            </LinearGradient>
          </Defs>
          <Path
            d="
              M64 0
              L124 24
              V84
              C124 112 90 140 64 144
              C38 140 4 112 4 84
              V24
              Z
            "
            fill="url(#grad)"
            stroke="#00000020"
            strokeWidth="1"
          />
          <TextSVG level={level} title={title} />
        </Svg>
      </View>

      <TouchableOpacity style={styles.navButton} onPress={onNext}>
        <ChevronRight size={24} color="#A0AEC0" />
      </TouchableOpacity>
    </View>
  );
};

const TextSVG = ({ level, title }: { level: number; title: string }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 37,
        left: 0,
        right: 0,
        alignItems: 'center',
      }}
    >
      <Text style={styles.levelLabel}>Level</Text>
      <Text style={styles.levelValue}>{level}</Text>
      <Text style={styles.levelTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    padding: 8,
    borderRadius: 999,
  },
  badgeWrapper: {
    marginHorizontal: 32,
    position: 'relative',
  },
  levelLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  levelValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  levelTitle: {
    fontSize: 10,
    marginTop: 4,
    color: 'white',
    opacity: 0.9,
  },
});

export default LevelBadge;
