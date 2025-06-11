import { GOOGLE_VISION_API_KEY } from '@env';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
} from 'react-native';
import { checkScamWithGradio } from './checkScamWithGradio';
import NumberCheck from '~/components/custom-ui/home/numberCheck';
import { addNumberScam, checkNumberScam } from '~/firebase/numberScamApi';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { checkImageForScam } from '~/backend/app/ai/llama';
import CheckScamForm from './checkScamForm';

const tabs = ['Text', 'Image', 'Number', 'App', 'Crypto'];

export default function CheckTypePage() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'text' | 'image' | 'number' | 'app' | 'crypto'
  >('text');
  const [input, setInput] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme();
  const [textInput, setTextInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [description, setDescription] = useState<string>('');
  const [appInput, setAppInput] = useState('');
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isScam, setIsScam] = useState(false);

  const pickImageForText = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });
    if (!result.canceled && result.assets.length > 0) {
      const base64Img = result.assets[0].base64;
      setImage(result.assets[0].uri);
      if (base64Img) {
        extractTextFromImage(base64Img);
      }
    }
  };

  const pickImageForImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImageUri(result.assets[0].uri); // Just set the uri
    }
  };

  const extractTextFromImage = async (base64Image: string) => {
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [
              {
                image: { content: base64Image },
                features: [{ type: 'TEXT_DETECTION' }],
              },
            ],
          }),
        }
      );
      const result = await response.json();
      const text =
        result.responses?.[0]?.fullTextAnnotation?.text || 'No text found';
      setExtractedText(text);
      setTextInput(text);
    } catch (err) {
      console.error('Failed to extract text:', err);
      Alert.alert('Error', 'Failed to extract text from image.');
    }
  };

  useEffect(() => {
    const tabType = (type as string)?.toLowerCase();
    if (['text', 'image', 'number', 'app', 'crypto'].includes(tabType)) {
      setActiveTab(tabType as any);
    }
  }, [type]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back', // Changes the text next to the back arrow (iOS only)
      title: '', // Changes the current screen's title
      headerBackTitleVisible: true, // Optional: make sure it's visible
    });
  }, []);

  const handleCheckPress = async () => {
    // console.log("handleCheckPress triggered")
    if (isChecking) return; // prevent duplicate checks
    setIsChecking(true); // start spinner
    try {
      switch (activeTab) {
        case 'text':
          if (!textInput.trim()) {
            Alert.alert('Empty Input', 'Please enter a suspicious message.');
            return;
          }
          try {
            // Pass the user input into the function
            const verdict = await checkScamWithGradio(textInput);
            // verdict: { label: "Legitimate" | "SMiShing" | "Other Scam", explanation: string, confidence: number }
            // Navigate to result page and pass verdict data as params
            router.push({
              pathname: '/resultScreen', // adjust the path as needed
              params: {
                verdict: verdict.label,
                explanation: verdict.explanation,
                confidence: verdict.confidence,
              },
            });
          } catch (error: any) {
            console.error('Gradio API Error:', error);
            Alert.alert('Error', error.message || 'Failed to check message.');
          }
          break;

        case 'number':
          if (isScam) {
            addNumberScam(numberInput, description);
            router.push({
              pathname: '/resultScreen', // adjust the path as needed
              params: {
                verdict: 'Other Scam',
                explanation: 'Thanks for reporting the number',
                confidence: 1,
              },
            });
            break;
          }
          console.log('Checking number input:', numberInput);
          const result = await checkNumberScam(numberInput);

          console.log(result);

          const verdict = result ? 'Other Scam' : 'Not scam';
          const explanation = result
            ? 'The number has been reported to be a scam number'
            : 'There is no number in the data base';
          const confidence = result ? 1 : 0;
          router.push({
            pathname: '/resultScreen', // adjust the path as needed
            params: {
              verdict: verdict,
              explanation: explanation,
              confidence: confidence,
            },
          });
          break;

        case 'app':
          // console.log('Checking app input:', appInput);
          break;

        case 'image':
          // console.log('Image input triggered – open file picker or camera logic here.');
          const data = await checkImageForScam(selectedImageUri);
          console.log(data);
          break;

        case 'crypto':
          // console.log('File input triggered – open file picker or camera logic here.');
          break;

        default:
        // console.log('Unknown tab selected.');
      }
    } catch (error: any) {
      console.error('Gradio API Error:', error);
      Alert.alert('Error', error.message || 'Failed to check message.');
    } finally {
      setIsChecking(false); // always stop spinner at the end
    }
  };

  const handleTabChange = (
    tab: 'text' | 'image' | 'number' | 'app' | 'crypto'
  ) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(tab);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const inputClass =
    'border rounded-xl p-3 ' +
    (colorScheme === 'dark'
      ? 'border-gray-600 text-white'
      : 'border-gray-300 text-gray-800');

  const renderInputSection = () => {
    switch (activeTab) {
      case 'text':
        return (
          <View
            className={`border rounded-2xl p-4 mb-2 ${
              colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <Pressable onPress={pickImageForText}>
              <View
                className={`justify-center items-center h-36 rounded-xl mb-2 ${
                  colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                } border`}
              >
                <Text className="text-3xl mb-2">⬆️</Text>
                <Text
                  className={`text-center ${
                    colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Upload an image
                </Text>
              </View>
            </Pressable>
            <Text
              className={`text-center my-2 ${
                colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              OR
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              scrollEnabled={true}
              textAlignVertical="top"
              style={{ minHeight: 120 }}
              placeholder="Paste the suspicious message, email or text here..."
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
              className={inputClass}
              value={textInput}
              onChangeText={setTextInput}
            />
          </View>
        );
      case 'image':
        return <CheckScamForm />;
      // (
      //   <View
      //     className={`border rounded-2xl p-4 mb-2 ${
      //       colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
      //     }`}
      //   >
      //     <Pressable onPress={pickImageForImage}>
      //       <View
      //         className={`justify-center items-center h-36 rounded-xl mb-2 ${
      //           colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
      //         } border`}
      //       >
      //         <Text className="text-3xl mb-2">⬆️</Text>
      //         <Text
      //           className={`text-center ${
      //             colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      //           }`}
      //         >
      //           Upload an image
      //         </Text>
      //       </View>
      //     </Pressable>

      //     <Text
      //       className={`text-center my-2 ${
      //         colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      //       }`}
      //     >
      //       OR
      //     </Text>
      //     <View
      //       className={`justify-center items-center h-36 rounded-xl ${
      //         colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
      //       } border`}
      //     >
      //       <Text className="text-2xl mb-2">📷</Text>
      //       <Text
      //         className={`text-center ${
      //           colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      //         }`}
      //       >
      //         Take an image or video
      //       </Text>
      //     </View>

      //     {/* Image preview shown below the buttons */}
      //     {selectedImageUri && (
      //       <View style={{ marginTop: 24, alignItems: 'center' }}>
      //         <Text
      //           className={`mb-2 text-center ${
      //             colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      //           }`}
      //         >
      //           Preview
      //         </Text>
      //         <Image
      //           source={{ uri: selectedImageUri }}
      //           style={{
      //             width: 330,
      //             height: 220,
      //             borderRadius: 12,
      //             borderWidth: 1,
      //             borderColor: colorScheme === 'dark' ? '#444' : '#ccc',
      //           }}
      //           resizeMode="contain"
      //         />
      //         <Pressable
      //           onPress={() => setSelectedImageUri(null)}
      //           style={{ marginTop: 8 }}
      //         >
      //           <Text style={{ color: 'red' }}>Remove image</Text>
      //         </Pressable>
      //       </View>
      //     )}
      //   </View>
      // );
      case 'number':
        return (
          <View
            className={`border rounded-2xl p-4 mb-2 ${
              colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="📞 Enter a suspicious number..."
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
              className={inputClass + 'p-10'}
              value={numberInput}
              onChangeText={setNumberInput}
            />
            <View className="flex-row pt-3">
              <Checkbox
                checked={isScam}
                onCheckedChange={() => {
                  setIsScam(!isScam);
                }}
              />
              <Label className="pl-2">
                <Text>I got scammed</Text>
              </Label>
            </View>
            {isScam && (
              <View className="pt-3">
                <Input
                  placeholder="Describe the scam here"
                  numberOfLines={4}
                  placeholderTextColor={
                    colorScheme === 'dark' ? '#aaa' : '#666'
                  }
                  className={inputClass}
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            )}
          </View>
        );
      case 'app':
        return (
          <View
            className={`border rounded-2xl p-4 mb-2 ${
              colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="Enter apple/google store app download link"
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
              className={inputClass}
              value={appInput}
              onChangeText={setAppInput}
            />
          </View>
        );
      case 'crypto':
        return (
          <View
            className={`border rounded-2xl p-4 mb-2 ${
              colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="Enter apple/google store app download link"
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
              className={inputClass}
              value={appInput}
              onChangeText={setAppInput}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 p-5 bg-white dark:bg-black">
            {/* Back Button with Arrow */}
            <Pressable onPress={() => navigation.goBack()} className="mb-4">
              <Ionicons
                name="arrow-back"
                size={30}
                color={colorScheme === 'dark' ? 'white' : 'black'}
              />
            </Pressable>

            {/* Header */}
            {/* <View className="flex-row justify-between items-center mb-5">
              <Text className="text-3xl font-bold text-black dark:text-white">
                Check for Scams
              </Text>
            </View>
            <Text className="text-gray-600 dark:text-gray-300 mb-6">
              Spot something suspicious? Verify if it's a scam here!
            </Text> */}

            {/* Tabs */}
            {/* <View className="flex-row p-1 rounded-full self-start mb-4 bg-[#eaf0ff] dark:bg-slate-800">
              {tabs.map((tab) => (
                <Pressable
                  key={tab}
                  onPress={() => handleTabChange(tab.toLowerCase() as any)}
                  className={`flex-1 px-4 py-2 rounded-full items-center justify-center ${
                    activeTab === tab.toLowerCase()
                      ? "bg-white dark:bg-black"
                      : ""
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      activeTab === tab.toLowerCase()
                        ? "text-black dark:text-white"
                        : "text-blue-400"
                    }`}
                  >
                    {tab}
                  </Text>
                </Pressable>
              ))}
            </View> */}

            {/* Tabs */}
            {/* <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ScrollView
                horizontal={true} // Enable horizontal scrolling
                showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
                contentContainerStyle={{
                  flexDirection: 'row',
                  justifyContent: 'center', // Centers the content horizontally
                  alignItems: 'center', // Aligns items to the center vertically
                }}
              >
                <View className="flex-row p-1 rounded-full self-start mb-4 bg-[#eaf0ff] dark:bg-slate-800">
                  {tabs.map((tab) => (
                    <Pressable
                      key={tab}
                      onPress={() => handleTabChange(tab.toLowerCase() as any)}
                      className={`flex-1 px-8 py-2 rounded-full items-center justify-center ${
                        activeTab === tab.toLowerCase()
                          ? 'bg-white dark:bg-black'
                          : ''
                      }`}
                    >
                      <Text
                        className={`font-medium ${
                          activeTab === tab.toLowerCase()
                            ? 'text-black dark:text-white'
                            : 'text-blue-400'
                        }`}
                      >
                        {tab}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View> */}

            {/* Animated Input Section */}
            <Animated.View style={{ opacity: fadeAnim }}>
              {renderInputSection()}
            </Animated.View>

            {/* Check Button */}
            <Pressable
              onPress={handleCheckPress}
              className="bg-blue-600 p-4 rounded-xl mt-6"
            >
              <Text className="text-center text-white text-lg font-semibold">
                Check
              </Text>
            </Pressable>

            {/* Loading Indicator */}
            {isChecking && (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.35)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 9999,
                }}
                pointerEvents="auto"
              >
                <View
                  style={{
                    backgroundColor:
                      colorScheme === 'dark' ? '#18181b' : 'white', // tailwind slate-900
                    borderRadius: 12,
                    padding: 30,
                    alignItems: 'center',
                    opacity: 0.97,
                  }}
                >
                  <ActivityIndicator size="large" color="#2563eb" />
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 18,
                      color: colorScheme === 'dark' ? '#93c5fd' : '#2563eb', // tailwind blue-300 vs blue-600
                      fontWeight: 'bold',
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
