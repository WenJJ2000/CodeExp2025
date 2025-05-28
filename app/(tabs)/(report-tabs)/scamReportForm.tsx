import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useLayoutEffect, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";
import { createReport } from '../../../firebase/ScamReportApi';
import { auth } from '../../../firebase/firebase';

type ScamCategory =
    | "email"
    | "sms"
    | "phone"
    | "social"
    | "website"
    | "inPerson"
    | "app";

const SCAM_CONFIG: Record<
    ScamCategory,
    {
        senderLabel: string;
        titleLabel?: string;
        contentLabel: string;
    }
> = {
    email: {
        senderLabel: "Input Email",
        titleLabel: "What was the email title?",
        contentLabel: "What was the email message?",
    },
    sms: {
        senderLabel: "Phone number",
        titleLabel: "SMS title",
        contentLabel: "SMS content",
    },
    phone: {
        senderLabel: "Caller number",
        contentLabel: "Call content / summary",
    },
    social: {
        senderLabel: "Username / Profile name",
        contentLabel: "What message was sent?",
    },
    website: {
        senderLabel: "URL of the website",
        contentLabel: "What was suspicious?",
    },
    inPerson: {
        senderLabel: "Description of scammer",
        contentLabel: "What happened?",
    },
    app: {
        senderLabel: "App name or developer",
        contentLabel: "What did the app do?",
    },
};

export default function ScamReportForm() {
    const [step, setStep] = useState(1);
    const [scamType, setScamType] = useState<ScamCategory>("email");
    const [formData, setFormData] = useState({
        sender: "",
        title: "",
        content: "",
    });
    const [errors, setErrors] = useState({
    sender: '',
    title: '',
    content: '',
});


    const isDark = useColorScheme() === "dark";
    const config = SCAM_CONFIG[scamType];
    const user = auth.currentUser;
    const router = useRouter();

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back',       // Changes the text next to the back arrow (iOS only)
            title: 'Scam Report',          // Changes the current screen's title
            headerBackTitleVisible: true,  // Optional: make sure it's visible
        });
    }, []);


    const updateField = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        if (validateStep() && step < 4) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        const isValid = validateStep();
        if (!isValid) return;

        try {
            await createReport({
                scamType,
                sender: formData.sender,
                title: formData.title,
                content: formData.content,
                reporterId: user?.uid ?? "anonymous",
            });
            setStep(5);
        } catch (error) {
            console.error("Error submitting report:", error);
        }
    };


    const validateStep = (): boolean => {
        const newErrors = { sender: "", title: "", content: "" };
        let isValid = true;

        if (step === 2) {
            // Validate Sender
            if (!formData.sender.trim()) {
                newErrors.sender = "This field is required.";
                isValid = false;
            } else {
                switch (scamType) {
                    case "email":
                        if (!/^[\w.-]+@(?:gmail|hotmail|yahoo)\.com$/.test(formData.sender.trim())) {
                            newErrors.sender = "Must be a valid email.";
                            isValid = false;
                        }
                        break;
                    case "sms":
                    case "phone":
                        if (!/^\d{8}$/.test(formData.sender.trim())) {
                            newErrors.sender = "Must be 8-digit number.";
                            isValid = false;
                        }
                        break;
                    case "website":
                        try {
                            const url = new URL(formData.sender.trim());
                            if (!/^https?:\/\//.test(url.href)) {
                                throw new Error();
                            }
                        } catch {
                            newErrors.sender = "Invalid URL format.";
                            isValid = false;
                        }
                        break;
                    // Optionally add more:
                    case "social":
                    case "app":
                    case "inPerson":
                        if (formData.sender.trim().length < 3) {
                            newErrors.sender = "Too short.";
                            isValid = false;
                        }
                        break;
                }
            }

            // Validate Title if present
            if (config.titleLabel && !formData.title.trim()) {
                newErrors.title = "This field is required.";
                isValid = false;
            }
        } else if (step === 3) {
            // Validate Content
            if (!formData.content.trim()) {
                newErrors.content = "This field is required.";
                isValid = false;
            } else if (formData.content.trim().length < 10) {
                newErrors.content = "Please provide more details.";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };





    return (
        <ScrollView
            className={`flex-1 px-5 pt-10 ${isDark ? "bg-black" : "bg-white"}`}
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            {/* Step indicator */}
            <View className="flex-row justify-between mb-6">
                {[1, 2, 3, 4].map((s) => (
                    <View
                        key={s}
                        className={`h-2 flex-1 mx-1 rounded-full ${s <= step ? "bg-blue-600" : isDark ? "bg-gray-700" : "bg-gray-300"
                            }`}
                    />
                ))}
            </View>

            {/* Step 1: Scam type */}
            {step === 1 && (
                <>
                    <Text className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                        What would you like to report?
                    </Text>
                    {(Object.keys(SCAM_CONFIG) as ScamCategory[]).map((type) => (
                        <TouchableOpacity
                            key={type}
                            className={`border rounded-xl py-4 mb-3 items-center ${isDark ? "border-gray-500" : "border-black"
                                } ${scamType === type ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                            onPress={() => setScamType(type)}
                        >
                            <Text className={`capitalize text-lg ${isDark ? "text-white" : "text-black"}`}>
                                {type.replace(/([A-Z])/g, " $1")} scam
                            </Text>
                        </TouchableOpacity>
                    ))}
                </>
            )}

            {/* Step 2: Sender + Title */}
            {step === 2 && (
                <>
                    <Text className={`text-base mb-2 ${isDark ? "text-white" : "text-black"}`}>
                        {config.senderLabel}
                    </Text>
                    <TextInput
                        value={formData.sender}
                        onChangeText={(text) => {
                            updateField("sender", text);
                            setErrors((prev) => ({ ...prev, sender: '' }));
                        }}
                        className={`border rounded-lg p-3 mb-1 ${errors.sender
                                ? "border-red-500"
                                : isDark
                                    ? "bg-gray-900 text-white border-gray-600"
                                    : "bg-white text-black border-gray-400"
                            }`}
                        placeholder={config.senderLabel}
                        placeholderTextColor={isDark ? "#999" : "#666"}
                    />
                    {errors.sender ? <Text className="text-red-500 text-sm mb-3">{errors.sender}</Text> : null}


                    {config.titleLabel && (
                        <>
                            <Text className={`text-base mb-2 ${isDark ? "text-white" : "text-black"}`}>
                                {config.titleLabel}
                            </Text>
                            <TextInput
                                value={formData.title}
                                onChangeText={(text) => {
                                    updateField("title", text);
                                    setErrors((prev) => ({ ...prev, title: '' }));
                                }}
                                className={`border rounded-lg p-3 mb-1 ${errors.title
                                        ? "border-red-500"
                                        : isDark
                                            ? "bg-gray-900 text-white border-gray-600"
                                            : "bg-white text-black border-gray-400"
                                    }`}
                                placeholder={config.titleLabel}
                                placeholderTextColor={isDark ? "#999" : "#666"}
                            />
                            {errors.title ? <Text className="text-red-500 text-sm mb-3">{errors.title}</Text> : null}

                        </>
                    )}
                </>
            )}

            {/* Step 3: Content */}
            {step === 3 && (
                <>
                    <Text className={`text-base mb-2 ${isDark ? "text-white" : "text-black"}`}>
                        {config.contentLabel}
                    </Text>
                    <TextInput
                        value={formData.content}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        onChangeText={(text) => {
                            updateField("content", text);
                            setErrors((prev) => ({ ...prev, content: '' }));
                        }}
                        className={`border rounded-lg p-3 mb-1 ${errors.content
                                ? "border-red-500"
                                : isDark
                                    ? "bg-gray-900 text-white border-gray-600"
                                    : "bg-white text-black border-gray-400"
                            }`}
                        placeholder={config.contentLabel}
                        placeholderTextColor={isDark ? "#999" : "#666"}
                    />
                    {errors.content ? <Text className="text-red-500 text-sm mb-3">{errors.content}</Text> : null}
                </>
            )}

            {/* Step 4: Preview */}
            {step === 4 && (
                <>
                    <Text className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                        Preview
                    </Text>
                    <Text className={`mb-2 ${isDark ? "text-white" : "text-black"}`}>
                        <Text className="font-semibold">Type of scam: </Text>
                        {scamType}
                    </Text>
                    <Text className={`mb-2 ${isDark ? "text-white" : "text-black"}`}>
                        <Text className="font-semibold">Sender: </Text>
                        {formData.sender}
                    </Text>
                    {config.titleLabel && (
                        <Text className={`mb-2 ${isDark ? "text-white" : "text-black"}`}>
                            <Text className="font-semibold">Title: </Text>
                            {formData.title}
                        </Text>
                    )}
                    <Text className={`mb-2 font-semibold ${isDark ? "text-white" : "text-black"}`}>
                        Message:
                    </Text>
                    <Text
                        className={`border rounded-md p-3 ${isDark
                                ? "bg-gray-900 text-white border-gray-600"
                                : "bg-white text-black border-gray-300"
                            }`}
                    >
                        {formData.content}
                    </Text>
                </>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
                <View className="flex-1 justify-between p-6 bg-white dark:bg-black rounded-3xl shadow-lg mx-4 my-3">
                    {/* Icon at top */}
                    <View className="items-center mb-8">
                        <Image
                            source={require('../../../assets/images/ScamBustersLogo.png')}
                            style={{ width: 200, height: 200 }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Text content */}
                    <View className="items-center mb-12">
                        <Text className="text-2xl font-bold text-center text-black dark:text-white mb-2">
                            Your report has been submitted!
                        </Text>
                        <Text className="text-center text-gray-600 dark:text-gray-400">
                            We are in the midst of reviewing your submission.
                        </Text>
                    </View>

                    {/* Got it button */}
                    <TouchableOpacity
                        onPress={() => router.push('/(tabs)/(report-tabs)')}
                        className="bg-blue-600 py-4 rounded-lg"
                        style={{ width: '100%' }}
                    >
                        <Text className="text-white text-center text-lg">Got it</Text>
                    </TouchableOpacity>
                </View>
            )}


            {/* Navigation */}
            {step < 5 && (
                <View className="mt-6 flex-row justify-between">
                    {step > 1 && (
                        <TouchableOpacity
                            className="bg-gray-400 px-6 py-3 rounded-lg"
                            onPress={handleBack}
                        >
                            <Text className="text-white">Back</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        className="bg-blue-600 px-6 py-3 rounded-lg ml-auto"
                        onPress={step === 4 ? handleSubmit : handleNext}
                    >
                        <Text className="text-white">{step === 4 ? "Submit" : "Next"}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}
