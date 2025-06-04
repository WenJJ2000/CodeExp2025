import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Animated, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View, useColorScheme } from 'react-native';
import { checkScamWithGradio } from './checkScamWithGradio';

const tabs = ['Text', 'Image', 'Number', 'App'];

export default function CheckTypePage() {
    const { type } = useLocalSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'text' | 'image' | 'number' | 'app'>('text');
    const [input, setInput] = useState('');
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const colorScheme = useColorScheme();
    const [textInput, setTextInput] = useState('');
    const [numberInput, setNumberInput] = useState('');
    const [appInput, setAppInput] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const tabType = (type as string)?.toLowerCase();
        if (['text', 'image', 'number', 'app'].includes(tabType)) {
            setActiveTab(tabType as any);
        }
    }, [type]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back',       // Changes the text next to the back arrow (iOS only)
            title: '',          // Changes the current screen's title
            headerBackTitleVisible: true,  // Optional: make sure it's visible
        });
    }, []);

    const handleTextInputPress = () => {
        // Placeholder for future logic
        console.log('Input section pressed');
    };

    const handleImageInputPress = () => {
        // Placeholder for future logic
        console.log('Input section pressed');
    };

    const handleCheckPress = async () => {
        console.log("handleCheckPress triggered")
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
                console.log('Checking number input:', numberInput);
                break;

            case 'app':
                console.log('Checking app input:', appInput);
                break;

            case 'image':
                console.log('Image input triggered – open file picker or camera logic here.');
                break;

            default:
                console.log('Unknown tab selected.');
        }
    };


    const handleTabChange = (tab: 'text' | 'image' | 'number' | 'app') => {
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

    const inputClass = 'border rounded-xl p-3 ' +
        (colorScheme === 'dark' ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800');

    const renderInputSection = () => {
        switch (activeTab) {
            case 'text':
                return (
                    <View className={`border rounded-2xl p-4 mb-2 ${colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <Pressable onPress={handleTextInputPress}>
                            <View className={`justify-center items-center h-36 rounded-xl mb-2 ${colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'} border`}>
                                <Text className="text-3xl mb-2">⬆️</Text>
                                <Text className={`text-center ${colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Upload an image</Text>
                            </View>
                        </Pressable>
                        <Text className={`text-center my-2 ${colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>OR</Text>
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
                return (
                    <View className={`border rounded-2xl p-4 mb-2 ${colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <Pressable onPress={handleImageInputPress}>
                            <View className={`justify-center items-center h-36 rounded-xl mb-2 ${colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'} border`}>
                                <Text className="text-3xl mb-2">⬆️</Text>
                                <Text className={`text-center ${colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Upload an image or video file</Text>
                            </View>
                        </Pressable>
                        <Text className={`text-center my-2 ${colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>OR</Text>
                        <View className={`justify-center items-center h-36 rounded-xl ${colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'} border`}>
                            <Text className="text-2xl mb-2">📷</Text>
                            <Text className={`text-center ${colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Take an image or video</Text>
                        </View>
                    </View>
                );
            case 'number':
                return (
                    <View className={`border rounded-2xl p-4 mb-2 ${colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            placeholder="📞 Enter a suspicious number..."
                            placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                            className={inputClass}
                            value={numberInput}
                            onChangeText={setNumberInput}
                        />
                    </View>
                );
            case 'app':
                return (
                    <View className={`border rounded-2xl p-4 mb-2 ${colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
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
                        {/* Header */}
                        <View className="flex-row justify-between items-center mb-5">
                            <Text className="text-3xl font-bold text-black dark:text-white">Check for Scams</Text>
                        </View>
                        <Text className="text-gray-600 dark:text-gray-300 mb-6">
                            Spot something suspicious? Verify if it's a scam here!
                        </Text>

                        {/* Tabs */}
                        <View className="flex-row p-1 rounded-full self-start mb-4 bg-[#eaf0ff] dark:bg-slate-800">
                            {tabs.map((tab) => (
                                <Pressable
                                    key={tab}
                                    onPress={() => handleTabChange(tab.toLowerCase() as any)}
                                    className={`flex-1 px-4 py-2 rounded-full items-center justify-center ${activeTab === tab.toLowerCase() ? 'bg-white dark:bg-black' : ''
                                        }`}
                                >
                                    <Text
                                        className={`font-medium ${activeTab === tab.toLowerCase() ? 'text-black dark:text-white' : 'text-blue-400'
                                            }`}
                                    >
                                        {tab}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>

                        {/* Animated Input Section */}
                        <Animated.View style={{ opacity: fadeAnim }}>
                            {renderInputSection()}
                        </Animated.View>

                        {/* Check Button */}
                        <Pressable onPress={handleCheckPress} className="bg-blue-600 p-4 rounded-xl mt-6">
                            <Text className="text-center text-white text-lg font-semibold">Check</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
