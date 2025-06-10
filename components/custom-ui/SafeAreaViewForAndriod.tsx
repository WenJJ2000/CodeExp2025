import { Platform, SafeAreaView, StyleProp, ViewStyle } from "react-native";

export default function SafeAreaViewForAndroid({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <SafeAreaView
      className={` ${Platform.OS == "android" ? "pt-12" : ""}` + className}
      style={style}
    >
      {children}
    </SafeAreaView>
  );
}
