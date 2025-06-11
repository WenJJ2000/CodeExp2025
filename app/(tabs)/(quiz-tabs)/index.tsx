// import { useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { View } from 'react-native';
// import AnimatedProgressBar from '~/components/QuizPage/AnimatedProgressBar';
// import ShieldBadge from '~/components/QuizPage/Badge';
// import UserHeader from '~/components/QuizPage/UserHeader';
// import { Button } from '~/components/ui/button';
// import { Text } from '~/components/ui/text';
// import { getCurrentUserData } from '~/firebase/UserApi';
// import { useAuth } from '~/lib/useContext/useAuthContext';

// export default function Screen() {
//   const maxLevel = 10;
//   const [currLevel, setCurrLevel] = useState<number>(1);
//   const router = useRouter();
//   const [currentLevel, setCurrentLevel] = useState<number>(1);
//   const { user, uid } = useAuth();

//   //   async function getCurrentLevel(id: string) {
//   //     let userData = await getCurrentUserData(id);
//   //     console.log('User Data:', userData);
//   //     // setCurrLevel(userData);
//   //     return userData;
//   //   }

//   useEffect(() => {
//     if (uid) {
//       console.log(getCurrentUserData(uid));
//     } else {
//       console.log('No user ID found, unable to get current level.');
//     }
//   }, []);

//   useEffect(() => {
//     // console.log("User in QuizPage:", user);
//     // console.log("UID in QuizPage:", uid);
//   }, [user, uid]);

//   return (
//     <View className="flex-1 bg-secondary/30 px-6 pt-4">
//       {/* Top-left User Header */}
//       <View className="absolute top-0 left-0 mt-4 ml-4 z-10">
//         <UserHeader />
//       </View>

//       {/* Main content with even vertical spacing */}
//       <View className="flex-1 justify-center items-center gap-6 mt-20">
//         <AnimatedProgressBar progress={100} />
//         <ShieldBadge level={1} title="Introduction" />
//       </View>

//       {/* Bottom Play Button */}
//       <View className="items-center pb-10">
//         <Button
//           style={{
//             backgroundColor: '#004CFF',
//             minWidth: 300,
//           }}
//           onPress={() => {
//             router.push('/(tabs)/(quiz-tabs)/questionPage' as any);
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 24,
//             }}
//           >
//             Play
//           </Text>
//         </Button>
//       </View>
//     </View>
//   );
// }
// // function getCurrentUserData(id: string) {
// //   throw new Error('Function not implemented.');
// // }

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { LectureContent } from '~/components/QuizPage/Lecture';
import RecentQuiz from '~/components/QuizPage/RecentQuiz';
import ShieldBadge from '~/components/QuizPage/ShieldBadge';
import { Text } from '~/components/ui/text';
import { getCurrentUserData } from '~/firebase/UserApi';
import { useAuth } from '~/lib/useContext/useAuthContext';

export default function Screen() {
  const maxLevel = 10;
  const [currLevel, setCurrLevel] = useState<number>(1);
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const { user, uid } = useAuth();

  //   async function getCurrentLevel(id: string) {
  //     let userData = await getCurrentUserData(id);
  //     console.log('User Data:', userData);
  //     // setCurrLevel(userData);
  //     return userData;
  //   }

  useEffect(() => {
    if (uid) {
      console.log(getCurrentUserData(uid));
    } else {
      console.log('No user ID found, unable to get current level.');
    }
  }, []);

  useEffect(() => {
    // console.log("User in QuizPage:", user);
    // console.log("UID in QuizPage:", uid);
  }, [user, uid]);

  return (
    <View className="flex-1 px-6 pt-4">
      {/* Top-left User Header */}
      {/* <View className="mt-4 z-10">
        <UserHeader/>
      </View> */}

      {/* Recent quiz */}
      <View className="flex-1 justify-center items-center gap-6 mt-5">
        {/* Recent Quiz Progress */}
        <View className="w-[100%]">
          <Pressable onPress={() => router.push('/(tabs)/(quiz-tabs)/lecture')}>
            <LectureContent />
          </Pressable>
          {/* <RecentQuiz /> */}
        </View>

        {/* Badge Section */}
        <View className="flex-1 justify-center items-center gap-6 mt-5">
          <ShieldBadge />
        </View>
      </View>

      {/* Bottom Play Button */}
      <View className="items-center pb-10">
        <TouchableOpacity
          style={{
            backgroundColor: '#004CFF',
            minWidth: 300,
            paddingVertical: 12,
            borderRadius: 8, // Optional: Add border radius for rounded corners
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            router.push('/(tabs)/(quiz-tabs)/questionPage' as any);
          }}
        >
          <Text style={{ fontSize: 20, color: 'white' }}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
