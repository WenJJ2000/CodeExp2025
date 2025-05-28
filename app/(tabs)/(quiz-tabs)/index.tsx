import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import ShieldBadge from '~/components/QuizPage/Badge';
import UserHeader from '~/components/QuizPage/UserHeader';
import { Check } from '~/lib/icons/Check';
import AnimatedProgressBar from '~/components/QuizPage/AnimatedProgressBar';
import { useState } from 'react';

export default function Screen() {
  const maxLevel = 10;
  const [currLevel, setCurrLevel] = useState<number>(1);
  return (
    <View className="flex-1 bg-secondary/30 px-6 pt-4">
      {/* Top-left User Header */}
      <View className="absolute top-0 left-0 mt-4 ml-4 z-10">
        <UserHeader />
      </View>

      {/* Main content with even vertical spacing */}
      <View className="flex-1 justify-center items-center gap-6 mt-20">
        <AnimatedProgressBar progress={100} />
        <ShieldBadge level={1} title="Introduction" />
      </View>

      {/* Bottom Play Button */}
      <View className="items-center pb-10">
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
    </View>
  );
}
