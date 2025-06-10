// import React, { useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Animated } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';

// interface ProgressBarProps {
//   progress: number; // 0 to 100
// }

// const getProgressColor = (progress: number) => {
//   if (progress <= 20) return '#EF4444'; // red
//   if (progress <= 40) return '#FACC15'; // yellow
//   if (progress <= 75) return '#3B82F6'; // blue
//   return '#22C55E'; // green
// };

// const getProgressMessage = (progress: number) => {
//   if (progress <= 20) return 'Getting started';
//   if (progress <= 40) return 'Doing well';
//   if (progress <= 60) return 'Halfway there';
//   if (progress <= 75) return 'Almost there';
//   if (progress <= 99) return 'Just a bit more';
//   return 'Completed';
// };

// const AnimatedProgressBar = ({ progress }: ProgressBarProps) => {
//   const animatedProgress = useRef(new Animated.Value(0)).current;
//   const progressColor = getProgressColor(progress);
//   const message = getProgressMessage(progress);

//   useEffect(() => {
//     Animated.timing(animatedProgress, {
//       toValue: progress,
//       duration: 800,
//       useNativeDriver: false,
//     }).start();
//   }, [progress]);

//   const widthInterpolation = animatedProgress.interpolate({
//     inputRange: [0, 100],
//     outputRange: ['0%', '100%'],
//   });

//   return (
//     <View style={styles.wrapper}>
//       {/* Left circle indicator */}
//       <View style={[styles.circle, { backgroundColor: progressColor }]}>
//         {progress === 100 ? (
//           <Feather name="check" size={28} color="#fff" />
//         ) : null}
//       </View>

//       {/* Right content: % and message */}
//       <View style={styles.content}>
//         <View style={styles.labelRow}>
//           <Text style={[styles.percentText, { color: progressColor }]}>
//             {`${Math.round(progress)}%`}
//           </Text>
//           <Text style={styles.messageText}>{message}</Text>
//         </View>
//         <View style={styles.barBackground}>
//           <Animated.View
//             style={[
//               styles.barFill,
//               {
//                 backgroundColor: progressColor,
//                 width: widthInterpolation,
//               },
//             ]}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     width: '100%',
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   circle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//     marginTop: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ccc',
//   },
//   content: {
//     flex: 1,
//     flexDirection: 'column',
//   },
//   labelRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//     paddingRight: 4,
//   },
//   percentText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#4B5563', // gray-700
//   },
//   barBackground: {
//     height: 14,
//     backgroundColor: '#E5E7EB', // gray-200
//     borderRadius: 7,
//     overflow: 'hidden',
//   },
//   barFill: {
//     height: '100%',
//     borderRadius: 7,
//   },
// });

// export default AnimatedProgressBar;

// AnimatedProgressBar.tsx

import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const getProgressColor = (progress: number) => {
  if (progress <= 20) return '#EF4444'; // red
  if (progress <= 40) return '#FACC15'; // yellow
  if (progress <= 75) return '#3B82F6'; // blue
  return '#22C55E'; // green
};

const getProgressMessage = (progress: number) => {
  if (progress <= 20) return 'Getting started';
  if (progress <= 40) return 'Doing well';
  if (progress <= 60) return 'Halfway there';
  if (progress <= 75) return 'Almost there';
  if (progress <= 99) return 'Just a bit more';
  return 'Completed';
};

const AnimatedProgressBar = ({ progress }: ProgressBarProps) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const progressColor = getProgressColor(progress);
  const message = getProgressMessage(progress);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolation = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.circle, { backgroundColor: progressColor }]}>
        {progress === 100 ? (
          <Feather name="check" size={28} color="#fff" />
        ) : null}
      </View>

      <View style={styles.content}>
        <View style={styles.labelRow}>
          <Animated.Text style={[styles.percentText, { color: progressColor }]}>
            {`${Math.round(progress)}%`}
          </Animated.Text>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        <View style={styles.barBackground}>
          <Animated.View
            style={[
              styles.barFill,
              {
                backgroundColor: progressColor,
                width: widthInterpolation,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
    // marginBottom: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingRight: 4,
  },
  percentText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageText: {
    fontSize: 16,
    color: '#4B5563', // gray-700
  },
  barBackground: {
    height: 14,
    backgroundColor: '#E5E7EB', // gray-200
    borderRadius: 7,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 7,
  },
});

export default AnimatedProgressBar;
