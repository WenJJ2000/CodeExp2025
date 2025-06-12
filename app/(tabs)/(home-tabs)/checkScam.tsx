import { GOOGLE_VISION_API_KEY } from "@env";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";
import { checkScamWithGradio } from "./checkScamWithGradio";
import NumberCheck from "~/components/custom-ui/home/numberCheck";
import { addNumberScam, checkNumberScam } from "~/firebase/numberScamApi";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  checkImageForScam,
  generateTitleAndDescription,
} from "~/backend/app/ai/llama";
import CheckScamForm from "./checkScamForm";
import ForumPageHeader from "~/components/custom-ui/forum/forumpage-header";
import { createReport } from "~/firebase/ScamReportApi";
import { getLongLat, getToken } from "~/firebase/OneMapApi";
import { useAuth } from "~/lib/useContext/useAuthContext";

export default function CheckTypePage() {
  //   const { type } = useLocalSearchParams();
  const router = useRouter();

  const [type, setType] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme();
  const { uid } = useAuth();
  const [numberInput, setNumberInput] = useState("");
  const [description, setDescription] = useState<string>("");
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [oneMapToken, setOneMapToken] = useState<string>("");
  const [location, setLocation] = useState({
    postalCode: "",
    latitude: 0,
    longitude: 0,
  });
  const pickImageForText = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const base64Img = result.assets[0].base64;
      setImage(result.assets[0].uri);
      setSelectedImageUri(result.assets[0].uri);
      if (base64Img) {
        const textData = await extractTextFromImage(base64Img);
        setDescription(textData);
      }
    }
  };

  //   useEffect(() => {
  //     console.log(description);
  //   }, [description]);
  useEffect(() => {
    if (oneMapToken === "") {
      getToken()
        .then((data) => data.json())
        .then((tokenData) => {
          if (tokenData.access_token) {
            setOneMapToken(tokenData.access_token);
          } else {
            Alert.alert("Error", "Failed to retrieve OneMap token.");
          }
        });
    }
  }, []);

  const pickImageForImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImageUri(result.assets[0].uri); // Just set the uri
    }
  };
  const handleLocation = (text: string) => {
    getLongLat(text, oneMapToken)
      .then((data) => data.json())
      .then((longLatData) => {
        if (longLatData.results && longLatData.results.length > 0) {
          const result = longLatData.results[0];
          setLocation({
            postalCode: text,
            longitude: parseFloat(result.LONGITUDE),
            latitude: parseFloat(result.LATITUDE),
          });
        } else {
          setLocation({ postalCode: "", longitude: 0, latitude: 0 });
        }
      });
  };
  useEffect(() => {
    if (location.postalCode) {
      handleLocation(location.postalCode);
      console.log("Location updated:", location);
    }
  }, [location.postalCode]);
  const extractTextFromImage = async (base64Image: string) => {
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requests: [
              {
                image: { content: base64Image },
                features: [{ type: "TEXT_DETECTION" }],
              },
            ],
          }),
        }
      );
      const result = await response.json();
      const text =
        result.responses?.[0]?.fullTextAnnotation?.text || "No text found";
      setExtractedText(text);
      //   setDescription(text);
      return text;
    } catch (err) {
      console.error("Failed to extract text:", err);
      Alert.alert("Error", "Failed to extract text from image.");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back", // Changes the text next to the back arrow (iOS only)
      title: "", // Changes the current screen's title
      headerBackTitleVisible: true, // Optional: make sure it's visible
    });
  }, []);

  const handleCheckPress = async () => {
    // console.log("handleCheckPress triggered")
    if (isChecking) return; // prevent duplicate checks
    setIsChecking(true); // start spinner
    try {
      if (selectedImageUri) {
        switch (type) {
          case "email":
          case "sms":
          case "social":
          case "website":
            const textData = await extractTextFromImage(selectedImageUri);
            setDescription((prev) => {
              return prev + "\n" + extractedText;
            });
            break;
        }
      }
      switch (type) {
        case "email":
          const data = await checkImageForScam(image, description);
          if (data.choices[0].message.content) {
            const cleaned_data = data.choices[0].message.content
              .replace(/```/g, "")
              .trim();
            const d = JSON.parse(cleaned_data);
            if (d.isScam) {
              const data = await generateTitleAndDescription(description);
              if (data.choices[0].message.content) {
                const cleaned_data = data.choices[0].message.content
                  .replace(/```/g, "")
                  .trim();
                const d = JSON.parse(cleaned_data);

                createReport({
                  scamReportType: "EMAIL",
                  sender: d.title || "No title",
                  title: "",
                  content: d.content || description || "No content",
                  createdBy: uid || "anonymous",
                  images: selectedImageUri ? [selectedImageUri] : [],
                  location: location,
                });
              }
            }
            router.push({
              pathname: "/resultScreen", // adjust the path as needed
              params: {
                verdict: d.isScam ? "Other Scam" : "",
                explanation: d.reasons[0],
                confidence: d.confidence,
              },
            });
          }
          break;
        case "sms":
          //   if (!description.trim()) {
          //     Alert.alert('Empty Input', 'Please enter a suspicious message.');
          //     return;
          //   }
          try {
            // Pass the user input into the function
            const verdict = await checkScamWithGradio(description);
            // verdict: { label: "Legitimate" | "SMiShing" | "Other Scam", explanation: string, confidence: number }
            // Navigate to result page and pass verdict data as params
            if (verdict.confidence > 0.8) {
              const data = await generateTitleAndDescription(description);
              if (data.choices[0].message.content) {
                const cleaned_data = data.choices[0].message.content
                  .replace(/```/g, "")
                  .trim();
                const d = JSON.parse(cleaned_data);

                createReport({
                  scamReportType: "SMS",
                  sender: d.title || "No title",
                  title: "",
                  content: d.content || description || "No content",
                  createdBy: uid || "anonymous",
                  images: selectedImageUri ? [selectedImageUri] : [],
                  location: location,
                });
                // createReport({
                //   scamReportType: "SMS",
                //   sender: `SMS scam detected with confidence ${verdict.confidence}`,
                //   title: ``,
                //   content: description || "No content",
                //   createdBy: uid || "anonymous",
                //   images: selectedImageUri ? [selectedImageUri] : [],
                //   location: location,
                // });
              }
            }
            router.push({
              pathname: "/resultScreen", // adjust the path as needed
              params: {
                verdict: verdict.label,
                explanation: verdict.explanation,
                confidence: verdict.confidence,
              },
            });
          } catch (error: any) {
            console.error("Gradio API Error:", error);
            Alert.alert("Error", error.message || "Failed to check message.");
          }
          break;

        case "phone":
          console.log("Checking number input:", numberInput);
          const result = await checkNumberScam(numberInput);

          console.log(result);

          const verdict = result ? "Other Scam" : "Not scam";
          const explanation = result
            ? "The number has been reported to be a scam number"
            : "There is no number in the data base";
          const confidence = result ? 1 : 0;
          if (result) {
            const data = await generateTitleAndDescription(description);
            if (data.choices[0].message.content) {
              const cleaned_data = data.choices[0].message.content
                .replace(/```/g, "")
                .trim();
              const d = JSON.parse(cleaned_data);

              createReport({
                scamReportType: "PHONE",
                sender: d.title || "No title",
                title: "",
                content: d.content || description || "No content",
                createdBy: uid || "anonymous",
                images: selectedImageUri ? [selectedImageUri] : [],
                location: location,
              });
            }
          }
          router.push({
            pathname: "/resultScreen", // adjust the path as needed
            params: {
              verdict: verdict,
              explanation: explanation,
              confidence: confidence,
            },
          });
          break;

        case "social":
          // console.log('Image input triggered – open file picker or camera logic here.');

          break;
        case "website":
          break;

        case "inPerson":
          try {
            // Pass the user input into the function
            const verdict = await checkScamWithGradio(description);
            // verdict: { label: "Legitimate" | "SMiShing" | "Other Scam", explanation: string, confidence: number }
            // Navigate to result page and pass verdict data as params
            if (verdict.label === "Other Scam") {
              const data = await generateTitleAndDescription(description);
              if (data.choices[0].message.content) {
                const cleaned_data = data.choices[0].message.content
                  .replace(/```/g, "")
                  .trim();
                const d = JSON.parse(cleaned_data);

                createReport({
                  scamReportType: "IN_PERSON",
                  sender: d.title || "No title",
                  title: "",
                  content: d.content || description || "No content",
                  createdBy: uid || "anonymous",
                  images: selectedImageUri ? [selectedImageUri] : [],
                  location: location,
                });
              }
            }
            router.push({
              pathname: "/resultScreen", // adjust the path as needed
              params: {
                verdict: verdict.label,
                explanation: verdict.explanation,
                confidence: verdict.confidence,
              },
            });
          } catch (error: any) {
            console.error("Gradio API Error:", error);
            Alert.alert("Error", error.message || "Failed to check message.");
          }
          break;

        case "app":
          // console.log('Checking app input:', appInput);
          break;

        case "crypto":
          // console.log('File input triggered – open file picker or camera logic here.');
          break;

        default:
        // console.log('Unknown tab selected.');
      }
    } catch (error: any) {
      console.error("Gradio API Error:", error);
      Alert.alert("Error", error.message || "Failed to check message.");
    } finally {
      setIsChecking(false); // always stop spinner at the end
    }
  };

  const inputClass =
    "border rounded-xl p-3 " +
    (colorScheme === "dark"
      ? "border-gray-600 text-white"
      : "border-gray-300 text-gray-800");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 p-5 bg-white dark:bg-black">
            <Animated.View style={{ opacity: fadeAnim }}>
              <CheckScamForm
                selectedImageUri={selectedImageUri}
                setSelectedImageUri={setSelectedImageUri}
                description={description}
                setDescription={setDescription}
                type={type}
                setType={setType}
                pickImageForImage={pickImageForImage}
                pickImageForText={pickImageForText}
                location={location}
                setLocation={setLocation}
              />
            </Animated.View>
            <Pressable
              onPress={handleCheckPress}
              className="bg-blue-600 p-4 rounded-xl mt-6"
            >
              <Text className="text-center text-white text-lg font-semibold">
                Check
              </Text>
            </Pressable>
            {isChecking && (
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.35)",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
                pointerEvents="auto"
              >
                <View
                  style={{
                    backgroundColor:
                      colorScheme === "dark" ? "#18181b" : "white", // tailwind slate-900
                    borderRadius: 12,
                    padding: 30,
                    alignItems: "center",
                    opacity: 0.97,
                  }}
                >
                  <ActivityIndicator size="large" color="#2563eb" />
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 18,
                      color: colorScheme === "dark" ? "#93c5fd" : "#2563eb", // tailwind blue-300 vs blue-600
                      fontWeight: "bold",
                    }}
                  >
                    Checking, please wait…
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
