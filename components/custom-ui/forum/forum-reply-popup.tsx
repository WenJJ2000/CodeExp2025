import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRef, useState, RefObject } from "react";
import { Pressable, View, Image, Keyboard, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { Reply, ScamReport } from "~/lib/types";
import { useColorScheme } from "~/lib/useColorScheme";
import TabLayout from "~/app/(tabs)/_layout";
import { TabActions, TabRouter } from "@react-navigation/native";
import { useShowTab } from "~/lib/useContext/useShowTabContext";
import { reply } from "~/firebase/ReplyApi";
import { useAuth } from "~/lib/useContext/useAuthContext";
import * as FileSystem from "expo-file-system";
export function ForumReplyPopup({
  scamReportOrReply,
  isScamReport = true,
  onBlur = () => {
    console.log("Input blurred");
  },
}: {
  scamReportOrReply: ScamReport | Reply;
  isScamReport?: boolean;
  onBlur?: () => void;
}) {
  if (!scamReportOrReply) {
    return null; // Handle the case where scamReportOrReply is undefined
  }
  const { colorScheme } = useColorScheme();
  const inputRef = useRef<TextInput>(null) as RefObject<TextInput>;
  const tempRef = useRef<TextInput>(null) as RefObject<TextInput>;
  const [blurred, setBlurred] = useState(false);
  const user = isScamReport
    ? (scamReportOrReply as ScamReport).reporter
    : (scamReportOrReply as Reply).user;
  const { uid } = useAuth();
  const [replyContent, setReplyContent] = useState("");
  const [keyboardType, setKeyboardType] = useState<"keyboard" | "image">(
    "keyboard"
  );
  const [zoom, setZoom] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1, // Limit to one image
    });

    if (!result.canceled) {
      setImage(await convertImageToBase64(result.assets[0].uri));
    }
    setKeyboardType("keyboard");
  };
  const convertImageToBase64 = async (fileUri: string) => {
    try {
      const base64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return base64Data;
    } catch (error) {
      console.error("Error converting image to base64:", error);

      return null;
    }
  };
  const onSubmitReply = async () => {
    if (!uid) {
      console.log("User not authenticated");
      return;
    }
    if (replyContent.trim() === "") {
      console.log("Replys content cannot be empty");
      return;
    }
    await reply(
      uid,
      scamReportOrReply.id,
      replyContent,
      image ? image : "",
      !isScamReport
    );
    setReplyContent("");
    setImage(null);
    onBlur();
  };
  return (
    <>
      {zoom && image && (
        <Pressable
          className="absolute w-full h-full bg-black/20 justify-center items-center z-10"
          onPress={() => {
            setZoom(false);
            inputRef.current?.focus();
            tempRef.current?.blur();
          }}
        >
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            className=" w-80 h-80 rounded-lg border-2 border-gray-300"
            resizeMode="cover"
          />
        </Pressable>
      )}
      <View className=" w-full h-fit flex-col justify-start items-start px-4 py-2  rounded-t-3xl  bg-secondary/50 border-2 border-b-0 border-secondary">
        <Text className="text-base mb-2">
          Commenting on <Text className="font-bold">{user.username}</Text>
        </Text>

        <Textarea
          placeholder="Join the conversation..."
          className="w-full border-0 p-0 mb-2 shadow-0 bg-inherit overflow-visible min-h-[20px]"
          multiline
          numberOfLines={6}
          autoCapitalize="none"
          autoFocus
          onChangeText={(text) => setReplyContent(text)}
          value={replyContent}
          ref={inputRef}
          onBlur={() => {
            blurred && onBlur();
            setBlurred(true);
          }}
          onPressOut={() => {
            if (keyboardType === "image") {
              setKeyboardType("keyboard");
            }
          }}
          keyboardType="default"
          returnKeyType="default"
        />
        <Input
          className="display-none h-0 w-0"
          style={{ opacity: 0, height: 0, width: 0 }}
          ref={tempRef}
          keyboardType="default"
          returnKeyType="default"
        />
        <View className="w-full flex-row justify-between items-center mb-2">
          {image && (
            <Pressable
              onPress={() => {
                setZoom(!zoom);
                setBlurred(false);
                tempRef.current?.focus();
                inputRef.current?.blur();
              }}
            >
              <Image
                source={{ uri: `data:image/jpeg;base64,${image}` }}
                className="w-20 h-20 rounded-lg border-2 border-gray-300"
                resizeMode="cover"
              />
            </Pressable>
          )}
        </View>
        <View className="flex-row justify-between items-center w-full">
          <View className="flex-row items-center gap-2 w-fit">
            <Pressable
              className={`${
                keyboardType === "keyboard" ? "bg-secondary" : ""
              } p-2 rounded-lg shadow-sm shadow-slate-300`}
              onPress={() => setKeyboardType("keyboard")}
            >
              <FontAwesome6
                name="keyboard"
                size={20}
                color={colorScheme == "light" ? "black" : "white"}
              />
            </Pressable>
            <Pressable
              className={`${
                keyboardType === "image" ? "bg-secondary" : ""
              } p-2 rounded-lg shadow-sm`}
              onPress={() => {
                pickImage();
                setKeyboardType("image");
                setBlurred(false);
              }}
              onBlur={() => {
                setKeyboardType("keyboard");
                blurred && onBlur();
                setBlurred(true);
              }}
            >
              <FontAwesome6
                name="image"
                size={20}
                color={colorScheme == "light" ? "black" : "white"}
              />
            </Pressable>
          </View>
          <Pressable
            className="bg-primary px-4 py-2 rounded-lg"
            onPress={onSubmitReply}
          >
            <Text className="text-white">Reply</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
