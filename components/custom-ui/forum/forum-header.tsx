import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Pressable, View } from "react-native";
import { useState } from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import AppHeader from "../app-header";
import {
  Option,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Filters, ScamReportFilterTypes } from "~/lib/types";

export default function ForumHeader({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: Filters;
  setFilter: (filter: Filters) => void;
}) {
  return (
    <AppHeader
      leftChildren={<Text className="text-2xl font-bold ">Forum</Text>}
      rightChildren={
        <>
          <Input
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            className="w-full h-10 bg-background border border-input rounded-md p-2 text-base"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="search"
          />
          <Filter setFilter={setFilter} filter={filter} />
        </>
      }
    />
  );
}
// export type Filters =
//   | "All"
//   | "SMS"
//   | "Email"
//   | "Phone"
//   | "Social Media"
//   | "Website"
//   | "In Person"
//   | "Misinformation"
//   | "Verified"
//   | "Education";
export type FilterProps = {
  filter: Filters;
  setFilter: (filter: Filters) => void;
};
export function Filter({ filter, setFilter }: FilterProps) {
  const handleFilterPress = (selectedFilter: Filters) => {
    setFilter(selectedFilter);
    // console.log(`Filter set to: ${selectedFilter}`);
  };
  const { isDarkColorScheme } = useColorScheme();
  const contentInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  return (
    <Select
      onValueChange={(value: Option) => {
        handleFilterPress(value?.value as Filters);
      }}
    >
      <SelectTrigger
        className="rounded-md border border-input bg-background p-4 text-base items-center justify-center w"
        chevron={false}
      >
        <FontAwesome6
          name="filter"
          className="dark:color-white color-black"
          color={isDarkColorScheme ? "white" : "black"}
        />
      </SelectTrigger>
      <SelectContent insets={contentInsets} className="px-4">
        <SelectGroup>
          {ScamReportFilterTypes.map((x, i) => (
            <SelectItem label={x.label} value={x.value} key={i}>
              {x.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
  // <Pressable
  //   className="rounded-md border border-input bg-background p-4 text-base items-center justify-center"
  //   onPress={() => {
  //     setIsClicked(!isClicked);
  //   }}
  // >

  //   {isClicked && (
  //     <View
  //       className="absolute w-[150px] top-12 right-0 bg-background rounded-md shadow-lg p-2 mt-2 z-50"
  //       style={{ zIndex: 100000000, elevation: 5 }}
  //     >
  //       {filterOptions.map((option) => (
  //         <Pressable
  //           key={option}
  //           className={`p-2 ${
  //             filter === option ? "bg-secondary" : "bg-background"
  //           }`}
  //           onPress={() => {
  //             handleFilterPress(option);
  //             setIsClicked(!isClicked);
  //           }}
  //         >
  //           <Text className="text-base">{option}</Text>
  //         </Pressable>
  //       ))}
  //     </View>
  //   )}
  // </Pressable>
  // return (
  //   <Pressable
  //     className="rounded-md border border-input bg-background p-4 text-base items-center justify-center"
  //     onPress={() => {
  //       setIsClicked(!isClicked);
  //     }}
  //   >
  //     <FontAwesome6
  //       name="filter"
  //       className="dark:color-white color-black"
  //       color={isDarkColorScheme ? "white" : "black"}
  //     />
  //     {isClicked && (
  //       <View
  //         className="absolute w-[150px] top-12 right-0 bg-background rounded-md shadow-lg p-2 mt-2 z-50"
  //         style={{ zIndex: 100000000, elevation: 5 }}
  //       >
  //         {filterOptions.map((option) => (
  //           <Pressable
  //             key={option}
  //             className={`p-2 ${
  //               filter === option ? "bg-secondary" : "bg-background"
  //             }`}
  //             onPress={() => {
  //               handleFilterPress(option);
  //               setIsClicked(!isClicked);
  //             }}
  //           >
  //             <Text className="text-base">{option}</Text>
  //           </Pressable>
  //         ))}
  //       </View>
  //     )}
  //   </Pressable>
  // );
}
