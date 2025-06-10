// import { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import QuizOption from '~/components/QuizPage/QuizOption';
// import { Question } from '~/lib/types';
// import { questions } from '~/testData/quiz/questions';
// import { useRouter } from 'expo-router';

// export default function QuestionsPage() {
//   const [questionIndex, setQuestionIndex] = useState<number>(0);
//   const [levelQuestions, setLevelQuestions] = useState<Question[]>([]);
//   const router = useRouter();

//   const generateRandomQuestionList = () => {
//     const min = 0; // Minimum value
//     const max = questions.length; // Maximum value
//     for (let i = 0; i < 5; i++) {
//       // Generate random number in the range [min, max]
//       const number = Math.floor(Math.random() * (max - min + 1)) + min;
//       // Update state with the new random number
//       setLevelQuestions((prev) => [...prev, questions[number]]);
//     }
//     setQuestionIndex(0);
//   };
//   useEffect(() => {
//     generateRandomQuestionList();
//   }, []);

//   function handleRight() {
//     console.log('Correct answer!');
//     // Logic for correct answer
//     setQuestionIndex((prev) => {
//       if (prev < levelQuestions.length - 1) {
//         return prev + 1;
//       } else {
//         // Logic for completing the quiz
//         console.log('Quiz completed!');
//         router.push('/(tabs)/(quiz-tabs)' as any);
//         return prev; // Stay on the last question
//       }
//     });
//   }
//   function handleWrong() {
//     console.log('Wrong answer!');
//     // Logic for wrong answer
//   }
//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       {levelQuestions.length > 0 && (
//         <>
//           <View style={{ padding: 16, backgroundColor: '#f0f0f0' }}>
//             <Text
//               style={{
//                 fontSize: 24,
//                 fontWeight: 'bold',
//                 textAlign: 'center',
//               }}
//             >
//               {levelQuestions[questionIndex].question}
//             </Text>
//           </View>

//           <View
//             style={{
//               flexDirection: 'column',
//               justifyContent: 'space-around',
//               paddingHorizontal: 16,
//               paddingBottom: 20,
//               paddingTop: 170,
//               gap: 16,
//             }}
//           >
//             {
//               <>
//                 <View
//                   style={{ flexDirection: 'row', gap: 16, paddingBottom: 150 }}
//                 >
//                   <QuizOption
//                     description={
//                       levelQuestions[questionIndex].options[0].description
//                     }
//                     isCorrect={
//                       levelQuestions[questionIndex].options[0].isCorrect
//                     }
//                     onRight={handleRight}
//                     onWrong={handleWrong}
//                   />
//                   <QuizOption
//                     description={
//                       levelQuestions[questionIndex].options[1].description
//                     }
//                     isCorrect={
//                       levelQuestions[questionIndex].options[1].isCorrect
//                     }
//                     onRight={handleRight}
//                     onWrong={handleWrong}
//                   />
//                 </View>
//                 <View style={{ flexDirection: 'row', gap: 16 }}>
//                   <QuizOption
//                     description={
//                       levelQuestions[questionIndex].options[2].description
//                     }
//                     isCorrect={
//                       levelQuestions[questionIndex].options[2].isCorrect
//                     }
//                     onRight={handleRight}
//                     onWrong={handleWrong}
//                   />
//                   <QuizOption
//                     description={
//                       levelQuestions[questionIndex].options[3].description
//                     }
//                     isCorrect={
//                       levelQuestions[questionIndex].options[3].isCorrect
//                     }
//                     onRight={handleRight}
//                     onWrong={handleWrong}
//                   />
//                 </View>
//               </>
//             }
//           </View>
//         </>
//       )}
//     </View>
//   );
// }

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import QuizOption from '~/components/QuizPage/QuizOption'; // Importing your QuizOption component
import { questions } from '~/testData/quiz/questions'; // Assuming questions data is available

export default function QuestionsPage() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [levelQuestions, setLevelQuestions] = useState<any[]>([]); // Store random questions
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0); // Count correct answers
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false); // To reveal the answer after selection
  const [selectedOption, setSelectedOption] = useState<any>(null); // Track the selected option
  const router = useRouter();
  const colorScheme = useColorScheme();

  // Function to generate a list of 5 random questions
  const generateRandomQuestionList = () => {
    const min = 0;
    const max = questions.length;
    let randomQuestions: any[] = [];

    for (let i = 0; i < 5; i++) {
      const number = Math.floor(Math.random() * (max - min)) + min;
      randomQuestions.push(questions[number]);
    }
    setLevelQuestions(randomQuestions);
    setQuestionIndex(0);
  };

  // Run the question generation when the component mounts
  useEffect(() => {
    generateRandomQuestionList();
  }, []);

  // Handle user answer selection
  function handleAnswer(selectedOption: any) {
    setSelectedOption(selectedOption);
    setAnswerRevealed(true); // Reveal answer once the user selects an option

    // If the selected option is correct, increment the correct answer count
    if (selectedOption.isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  }

  // Move to the next question or navigate to the ScorePage if it's the last question
  function moveToNextQuestion() {
    setAnswerRevealed(false);
    setSelectedOption(null);

    if (questionIndex < levelQuestions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Navigate to the ScorePage and pass the score data
      router.push({
        pathname: '/scorePage',
        params: {
          totalScore: correctAnswersCount,
          totalQuestions: levelQuestions.length,
          correctAnswers: correctAnswersCount,
        },
      });
    }
  }

  // Calculate the progress
  const progress = ((questionIndex + 1) / levelQuestions.length) * 100;

  return (
    <View className="flex-1 pt-6">
      {levelQuestions.length > 0 && (
        <>
          {/* Progress Bar */}
          <View className="px-4 py-2">
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center', // Align items vertically in the center
                width: '100%',
              }}>
              <View
                style={{
                  flex: 1, // Allow the progress bar to take up available space
                  height: 15,
                  backgroundColor: '#e0e0e0',
                  borderRadius: 10,
                  marginRight: 10, // Space between the progress bar and the text
                }}>
                <View
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: '#3b82f6', //dark blue
                    borderRadius: 5,
                  }}
                />
              </View>
              <Text
                style={{
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                  fontSize: 16, // Adjusted the font size to make it look better with the bar
                  fontWeight: 'bold',
                }}
                numberOfLines={1} // Ensures the text stays on one line
              >
                {questionIndex + 1} / {levelQuestions.length}
              </Text>
            </View>
          </View>

          {/* Fixed Header */}
          <View className="pl-6 pr-4 pb-8 items-center">
            <Text
              style={{
                color: colorScheme === 'dark' ? '#fff' : '#000',
                fontSize: 25,
                fontWeight: 'bold',
                textAlign: 'left',
                marginTop: 16,
              }}
            >
              {levelQuestions[questionIndex].question}
            </Text>
          </View>

          {/* Content Below (Quiz Options and Navigation) */}
          <View className="flex-grow px-4 justify-between">
            {/* Quiz Options */}
            <View>
              {levelQuestions[questionIndex].options.map((option: any) => (
                <QuizOption
                  key={option.description}
                  description={option.description}
                  selected={selectedOption?.description === option.description} // Highlight selected option
                  onPress={() => handleAnswer(option)} // Pass selected option to handleAnswer
                  isCorrect={option.isCorrect} // To highlight correct option
                  answerRevealed={answerRevealed} // To check if the answer has been revealed
                />
              ))}
            </View>

            {/* Show Next Button after the answer is revealed */}
            {answerRevealed && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 24, width: '100%' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#3B82F6', // Blue color
                    paddingVertical: 12, // Padding on top and bottom
                    paddingHorizontal: 24, // Horizontal padding for the button
                    borderRadius: 8, // Rounded corners
                    width: '100%', // Make the button full-width
                  }}
                  onPress={moveToNextQuestion}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                    {questionIndex === levelQuestions.length - 1 ? 'Finish' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
        </>
      )}
    </View>
  );
}
