import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
// Update the import path below to the correct relative path where numberCheck.ts or numberCheck.js exists.
// For example, if the file is at 'lib/utils/numberCheck.ts', use:
import { checkNumberScam } from '~/firebase/numberScamApi';

interface NumberCheckProps {
  number: string;
  setNumber: (value: string) => void;
}

export default function NumberCheck(props: NumberCheckProps) {
  const { number, setNumber } = props;
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheck = async () => {
    const numList = await checkNumberScam(number);
    if (numList) {
      setIsValid(true);
      setErrorMessage(null);
    } else {
      setIsValid(false);
      setErrorMessage('This number is not a scam.');
    }
  };

  return (
    <View className="flex-1 bg-secondary/30 px-6 pt-4">
      <View className="flex-1 justify-center items-center gap-6 mt-20">
        <TextInput
          value={number}
          onChangeText={setNumber}
          placeholder="Enter number to check"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <Button onPress={handleCheck} className="w-full bg-blue-500">
          <Text className="text-white">Check Number</Text>
        </Button>
        {isValid !== null && (
          <Text
            className={`text-lg ${isValid ? 'text-green-500' : 'text-red-500'}`}
          >
            {isValid ? 'This number is a scam!' : errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
}
