// import { Button } from '../ui/button';
// import { View, Text } from 'react-native';

// interface QuizOptionProps {
//   description: string;
//   isCorrect: boolean;
//   onRight: () => void;
//   onWrong: () => void;
// }

// export default function QuizOption(props: QuizOptionProps) {
//   const { description, isCorrect, onRight, onWrong } = props;

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         style={{
//           backgroundColor: '#004CFF',
//           minWidth: 150,
//           padding: 16,
//           minHeight: 150,
//           maxHeight: '25%',
//           borderRadius: 8,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//         onPress={isCorrect ? onRight : onWrong}
//       >
//         <Text
//           style={{
//             fontSize: 16,
//             color: 'white',
//             textAlign: 'center',
//             lineHeight: 32,
//             maxWidth: 150,
//             minHeight: 100,
//           }}
//         >
//           {description}
//         </Text>
//       </Button>
//     </View>
//   );
// }


import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Button } from '../ui/button'; // Assuming you have a custom Button component

interface QuizOptionProps {
  description: string;
  selected: boolean; // To highlight the selected option
  onPress: () => void; // Handle selection
  isCorrect: boolean; // To check if the option is correct
  answerRevealed: boolean; // To check if the answer is revealed
}

const QuizOption = ({ description, selected, onPress, isCorrect, answerRevealed }: QuizOptionProps) => {
  // Start with the base button style
  let buttonStyle = [styles.button]; // Include all necessary styles
  let textStyle = styles.text; // Default text style

  // Apply conditional background color if answer is revealed
  if (answerRevealed) {
    if (isCorrect) {
      buttonStyle.push(styles.correct); // Apply green for correct answer
      textStyle = styles.textRevealed; // Change text color to white for revealed answer
    } else {
      buttonStyle.push(styles.incorrect); // Apply red for incorrect answer
      textStyle = styles.textRevealed; // Change text color to white for revealed answer
    }

    // For incorrect options that are not selected, apply reduced opacity
    if (!selected && !isCorrect) {
      buttonStyle.push(styles.incorrectReducedOpacity); // Reduce opacity for unselected incorrect options
    }
  }

  return (
    <View style={styles.container}>
      <Button style={buttonStyle} onPress={onPress}>
        <Text style={textStyle}>{description}</Text>
      </Button>
    </View>
  );
};

const baseButtonStyle: ViewStyle = {
  height: 70,
  width: '100%', // Button will fill available width
  paddingVertical: 12, // Padding for vertical alignment
  borderRadius: 8, // Rounded corners
  borderWidth: 2, // Border thickness
  borderColor: '#004CFF', // Border color
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
};

const baseTextStyle: TextStyle = {
  fontSize: 16,
  color: 'black',
  textAlign: 'center',
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  button: {
    ...baseButtonStyle, // Include base button style
    backgroundColor: '#ffffff', // Default background color
  },
  correct: {
    ...baseButtonStyle,
    backgroundColor: '#4CAF50', // Correct answer background color
    borderColor: '#388E3C', // Darker green for the border
  },
  incorrect: {
    ...baseButtonStyle,
    backgroundColor: '#F44336', // Incorrect answer background color
    borderColor: '#D32F2F', // Darker red for the border
    opacity: 1, // Full opacity for the selected incorrect answer
  },
  incorrectReducedOpacity: {
    opacity: 0.2, // Reduced opacity for unselected incorrect answers
    backgroundColor: '#F44336', // Incorrect answer background color
  },
  text: {
    ...baseTextStyle,
  },
  textRevealed: {
    ...baseTextStyle,
    color: 'white', // White text when answer is revealed
  },
});

export default QuizOption;
