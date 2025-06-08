import { Button } from '../ui/button';
import { View, Text } from 'react-native';

interface QuizOptionProps {
  description: string;
  isCorrect: boolean;
  onRight: () => void;
  onWrong: () => void;
}

export default function QuizOption(props: QuizOptionProps) {
  const { description, isCorrect, onRight, onWrong } = props;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        style={{
          backgroundColor: '#004CFF',
          minWidth: 150,
          padding: 16,
          minHeight: 150,
          maxHeight: '25%',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={isCorrect ? onRight : onWrong}
      >
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
            lineHeight: 32,
            maxWidth: 150,
            minHeight: 100,
          }}
        >
          {description}
        </Text>
      </Button>
    </View>
  );
}
