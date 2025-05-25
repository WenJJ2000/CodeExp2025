import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";

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

    const isDark = useColorScheme() === "dark";
    const config = SCAM_CONFIG[scamType];

    const updateField = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        console.log("Submit data:", { scamType, ...formData });
        setStep(5);
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
                        onChangeText={(text) => updateField("sender", text)}
                        className={`border rounded-lg p-3 mb-4 ${isDark
                                ? "bg-gray-900 text-white border-gray-600"
                                : "bg-white text-black border-gray-400"
                            }`}
                        placeholder={config.senderLabel}
                        placeholderTextColor={isDark ? "#999" : "#666"}
                    />

                    {config.titleLabel && (
                        <>
                            <Text className={`text-base mb-2 ${isDark ? "text-white" : "text-black"}`}>
                                {config.titleLabel}
                            </Text>
                            <TextInput
                                value={formData.title}
                                onChangeText={(text) => updateField("title", text)}
                                className={`border rounded-lg p-3 ${isDark
                                        ? "bg-gray-900 text-white border-gray-600"
                                        : "bg-white text-black border-gray-400"
                                    }`}
                                placeholder={config.titleLabel}
                                placeholderTextColor={isDark ? "#999" : "#666"}
                            />
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
                        onChangeText={(text) => updateField("content", text)}
                        className={`border rounded-lg p-3 ${isDark
                                ? "bg-gray-900 text-white border-gray-600"
                                : "bg-white text-black border-gray-400"
                            }`}
                        placeholder={config.contentLabel}
                        placeholderTextColor={isDark ? "#999" : "#666"}
                    />
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
                <View className="items-center justify-center py-16">
                    <Text className={`text-2xl font-bold text-center mb-4 ${isDark ? "text-white" : "text-black"}`}>
                        Your report has been submitted!
                    </Text>
                    <Text className={`text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        We are in the midst of reviewing your submission.
                    </Text>
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
