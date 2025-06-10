import { useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import { createReport } from "~/firebase/ScamReportApi";
import { useAuth } from "~/lib/useContext/useAuthContext";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { PressableImage } from "~/components/custom-ui/pressable-image";
import {
  Option,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScamReportType, scamReportTypes } from "~/lib/types";
import ImageTray from "~/components/custom-ui/image-tray";
import SafeAreaViewForAndroid from "~/components/custom-ui/SafeAreaViewForAndriod";

export default function AddPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [scamReportType, setScamReportType] = useState<ScamReportType>();
  const { uid } = useAuth();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const onSubmit = async () => {
    if (!scamReportType) {
      alert("Please select a forum post type");
      return;
    }
    if (!title) {
      alert("Please enter a title for your post");
      return;
    }
    if (!content) {
      alert("Please enter content for your post");
      return;
    }
    if (!uid) {
      alert("You must be logged in to create a post");
      return;
    }
    try {
      await createReport({
        scamReportType: scamReportType,
        sender: title,
        title: "",
        content,
        createdBy: uid,
        isEducation: true,
        images: images,
        location: "",
      });
    } catch (error) {
      console.error("Error creating report:", error);
    }
    router.push("/(tabs)/(forum-tabs)");
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,

      allowsMultipleSelection: true, // Allow multiple images
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
  return (
    <SafeAreaViewForAndroid className="flex-1 bg-secondary/30">
      <ScrollView className="ml-4 mr-4 mt-4 mb-2 p-4">
        <KeyboardAvoidingView>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-muted-foreground">
              Create a new forum post
            </Text>
          </View>
          <View className="mb-2 ">
            <Select
              onValueChange={(value: Option) => {
                setScamReportType(value?.value as ScamReportType);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  className="text-foreground text-sm native:text-lg"
                  placeholder="Select a forum post type"
                />
              </SelectTrigger>
              <SelectContent insets={contentInsets} className="px-4">
                <SelectGroup>
                  {scamReportTypes.map((x, i) => (
                    <SelectItem label={x.label} value={x.value} key={i}>
                      {x.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>
          <View className="mb-2 ">
            <Label className="text-lg font-semibold text-muted-foreground mb-2">
              <Text>Title</Text>
            </Label>
            <Input value={title} onChangeText={(text) => setTitle(text)} />
          </View>
          <View className="mb-4 ">
            <Label className="text-lg font-semibold text-muted-foreground mb-2">
              <Text>Content</Text>
            </Label>
            <Textarea
              value={content}
              numberOfLines={5}
              className="h-32"
              onChangeText={(text) => setContent(text)}
            />
          </View>
          <View className="mb-4 ">
            {images && <ImageTray images={images} />}
          </View>
          <View className="mb-2 ">
            <Button
              variant="outline"
              className="w-full mb-2"
              onPress={pickImage}
            >
              <Text className="text-lg font-semibold text-muted-foreground">
                Add Images
              </Text>
            </Button>
          </View>
          <View className="flex-row justify-between mt-4">
            <Button
              variant="outline"
              className="w-full mr-2"
              onPress={onSubmit}
            >
              <Text className="text-lg font-semibold text-primary">Submit</Text>
            </Button>
          </View>
          <View className="flex-row justify-between mt-4">
            <Button
              variant="outline"
              className="w-full mr-2"
              onPress={() =>
                router.canGoBack()
                  ? router.back()
                  : router.push("/(tabs)/(forum-tabs)")
              }
            >
              <Text className="text-lg font-semibold text-primary">Cancel</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaViewForAndroid>
  );
}
