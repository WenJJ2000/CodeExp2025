import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import QuizOption from '~/components/QuizPage/QuizOption';
import { Question } from '~/lib/types';
import { questions } from '~/testData/quiz/questions';
import { useRouter } from 'expo-router';

export default function QuestionsPage() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [levelQuestions, setLevelQuestions] = useState<Question[]>([]);
  const router = useRouter();

  const generateRandomQuestionList = () => {
    const min = 0; // Minimum value
    const max = questions.length; // Maximum value
    for (let i = 0; i < 5; i++) {
      // Generate random number in the range [min, max]
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      // Update state with the new random number
      setLevelQuestions((prev) => [...prev, questions[number]]);
    }
    setQuestionIndex(0);
  };
  useEffect(() => {
    generateRandomQuestionList();
  }, []);

  function handleRight() {
    console.log('Correct answer!');
    // Logic for correct answer
    setQuestionIndex((prev) => {
      if (prev < levelQuestions.length - 1) {
        return prev + 1;
      } else {
        // Logic for completing the quiz
        console.log('Quiz completed!');
        router.push('/(tabs)/(quiz-tabs)' as any);
        return prev; // Stay on the last question
      }
    });
  }
  function handleWrong() {
    console.log('Wrong answer!');
    // Logic for wrong answer
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {levelQuestions.length > 0 && (
        <>
          <View style={{ padding: 16, backgroundColor: '#f0f0f0' }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {levelQuestions[questionIndex].question}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingHorizontal: 16,
              paddingBottom: 20,
              paddingTop: 170,
              gap: 16,
            }}
          >
            {
              <>
                <View
                  style={{ flexDirection: 'row', gap: 16, paddingBottom: 150 }}
                >
                  <QuizOption
                    description={
                      levelQuestions[questionIndex].options[0].description
                    }
                    isCorrect={
                      levelQuestions[questionIndex].options[0].isCorrect
                    }
                    onRight={handleRight}
                    onWrong={handleWrong}
                  />
                  <QuizOption
                    description={
                      levelQuestions[questionIndex].options[1].description
                    }
                    isCorrect={
                      levelQuestions[questionIndex].options[1].isCorrect
                    }
                    onRight={handleRight}
                    onWrong={handleWrong}
                  />
                </View>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                  <QuizOption
                    description={
                      levelQuestions[questionIndex].options[2].description
                    }
                    isCorrect={
                      levelQuestions[questionIndex].options[2].isCorrect
                    }
                    onRight={handleRight}
                    onWrong={handleWrong}
                  />
                  <QuizOption
                    description={
                      levelQuestions[questionIndex].options[3].description
                    }
                    isCorrect={
                      levelQuestions[questionIndex].options[3].isCorrect
                    }
                    onRight={handleRight}
                    onWrong={handleWrong}
                  />
                </View>
              </>
            }
          </View>
        </>
      )}
    </View>
  );
}
