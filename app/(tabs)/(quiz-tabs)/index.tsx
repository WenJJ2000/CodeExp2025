import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import ShieldBadge from '~/components/QuizPage/Badge';

export default function Screen() {
  const TotalLevel = 10;

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <ShieldBadge level={1} title="Introduction" />

      <Button
        style={{
          backgroundColor: '#004CFF',
          minWidth: 300,
        }}
      >
        <Text
          style={{
            fontSize: 24,
          }}
        >
          Play
        </Text>
      </Button>
    </View>
  );
}
