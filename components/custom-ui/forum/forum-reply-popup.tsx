import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRef, useState, RefObject, useEffect } from "react";
import { Pressable, View, Image, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { Reply, ScamReport } from "~/lib/types";
import { useColorScheme } from "~/lib/useColorScheme";
import { reply } from "~/firebase/ReplyApi";
import { useAuth } from "~/lib/useContext/useAuthContext";
import * as FileSystem from "expo-file-system";
import { PressableImage } from "../pressable-image";
import ImageTray from "../image-tray";
export function ForumReplyPopup({
  scamReportId,
  scamReportOrReply,
  isScamReport = true,
  onBlur = (a, b) => {
    console.log("Input blurred");
  },
}: {
  scamReportId: string;
  scamReportOrReply: ScamReport | Reply;
  isScamReport?: boolean;
  onBlur?: (a: boolean, b: boolean) => void;
}) {
  if (!scamReportOrReply) {
    return null; // Handle the case where scamReportOrReply is undefined
  }
  const { colorScheme } = useColorScheme();
  const inputRef = useRef<TextInput>(null) as RefObject<TextInput>;
  const tempRef = useRef<TextInput>(null) as RefObject<TextInput>;
  const [isFocused, setIsFocused] = useState(true);
  const user = isScamReport
    ? (scamReportOrReply as ScamReport).createdBy
    : (scamReportOrReply as Reply).createdBy;
  const { uid } = useAuth();
  const [replyContent, setReplyContent] = useState("");
  const [keyboardType, setKeyboardType] = useState<"keyboard" | "image">(
    "keyboard"
  );
  const [images, setImages] = useState<string[]>([]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 5, // Limit to one image
    });

    if (!result.canceled) {
      for (const image of result.assets) {
        const base64Image = await convertImageToBase64(image.uri);
        if (base64Image) {
          setImages((prevImages) => [...prevImages, base64Image]);
        } else {
          console.error("Failed to convert image to base64");
        }
      }
    }
    setKeyboardType("keyboard");
    inputRef.current?.focus();
  };
  const convertImageToBase64 = async (fileUri: string) => {
    try {
      const base64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return base64Data;
    } catch (error) {
      console.error("Error converting image to base64:", error);

      return "";
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
    if (scamReportOrReply.id === undefined) {
      console.log("Scam report or reply ID is undefined");
      return;
    }
    console.log("Reply submitted successfully");
    await reply(
      uid,
      scamReportOrReply.id,
      scamReportId,
      replyContent,
      images,
      !isScamReport
    );
    setReplyContent("");
    setImages([]);
    onBlur(true, true);
  };
  useEffect(() => {
    if (isFocused) {
      return;
    }
    !inputRef.current?.isFocused() &&
      !tempRef.current?.isFocused() &&
      onBlur(inputRef.current?.isFocused(), tempRef.current?.isFocused());
  }, [inputRef.current?.isFocused(), tempRef.current?.isFocused(), isFocused]);
  return (
    <>
      <View className=" w-full h-fit flex-col justify-start items-start px-4 py-2  rounded-t-3xl  bg-secondary border-2 border-b-0 border-secondary shadow-sm shadow-slate-300">
        <Text className="text-base mb-2">
          Commenting on <Text className="font-bold">{user.username}</Text>
        </Text>

        <Textarea
          placeholder="Join the conversation..."
          className="min-w-full max-w-full border-0 p-0 mb-2 shadow-0 bg-inherit overflow-visible min-h-[20px]"
          multiline
          numberOfLines={6}
          autoCapitalize="none"
          autoFocus
          onChangeText={(text) => setReplyContent(text)}
          onBlur={() => {
            keyboardType === "keyboard" && setIsFocused(false);
          }}
          value={replyContent}
          ref={inputRef}
          keyboardType="default"
          returnKeyType="default"
        />
        <Input
          className="display-none h-0 w-0"
          style={{ opacity: 0, height: 0, width: 0 }}
          ref={tempRef}
          keyboardType="default"
          returnKeyType="default"
          onBlur={() => {
            keyboardType === "keyboard" && setIsFocused(false);
          }}
        />
        <View className="w-full flex-row justify-between items-center mb-2">
          {images && <ImageTray images={images} />}
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
                setIsFocused(true);
                pickImage();
                setKeyboardType("image");
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
