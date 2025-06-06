// DEPRECATED

// import { View, Image } from "react-native";
// import { Text } from "~/components/ui/text";

// interface BadgeCardProps {
//   emoji?: string;
//   imageSrc?: string;
//   label?: string;
//   date?: string;
// }

// export function BadgeCard({ emoji, imageSrc, label, date }: BadgeCardProps) {
//   return (
//     <View className="w-24 h-24 items-center justify-center rounded-full shadow-md bg-white mx-1">
//       {imageSrc ? (
//         <Image
//           className="w-19 h-19 rounded-full border border-red-500"
//           resizeMode="contain"
//         />
//       ) : (
//         <Text className="text-4xl">{emoji}</Text>
//       )}

//       {label && (
//         <Text className="text-xs text-center font-semibold mt-1">{label}</Text>
//       )}
//       {date && (
//         <Text className="text-[10px] text-gray-500 text-center">{date}</Text>
//       )}
//     </View>
//   );
// }
