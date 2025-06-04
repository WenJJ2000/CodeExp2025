import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function ResultScreen() {
    const router = useRouter();
    const { verdict, explanation, confidence } = useLocalSearchParams();
    const [showDetails, setShowDetails] = useState(false);

    // Choose style based on verdict
    let status, color, icon, message, submessage;
    const conf = Number(confidence);

    if (verdict === 'SMiShing' || verdict === 'Other Scam') {
        if (conf < 0.7) {
            status = 'CAUTIOUS!';
            color = '#ff9900';
            icon = '⚠️';
            message = 'This may be a scam';
            submessage = "There were no reported similar scams, but this could still be a potential scam. Proceed with caution.";
        } else {
            status = 'BEWARE!';
            color = '#ff4444';
            icon = '⚠️';
            message = 'This is likely a scam';
            submessage = "Refrain from clicking links, sharing personal info, downloading attachments, engaging with suspicious messages, making payments, or granting remote access";
        }
    } else {
        status = 'SAFE!';
        color = '#24b36b';
        icon = '✅';
        message = 'This is not a scam';
        submessage = "This is safe! Feel free to use it with confidence.";
    }

    return (
        <View style={{ flex: 1, backgroundColor: `${color}20`, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 20, width: '85%', alignItems: 'center' }}>
                <Text style={{ fontSize: 40 }}>{icon}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 28, color, textAlign: 'center' }}>{status}</Text>
                <Text style={{ fontSize: 22, color, textAlign: 'center', marginBottom: 10 }}>{message}</Text>
                <Text style={{ textAlign: 'center', color: '#555', marginBottom: 18 }}>{submessage}</Text>
                <Text style={{ textAlign: 'center', color: '#aaa', marginBottom: 24 }}>
                    Confidence: {confidence !== undefined ? (conf * 100).toFixed(1) : "N/A"}%
                </Text>

                {showDetails ? (
                    <>
                        <Text style={{ textAlign: 'center', color: '#888', marginBottom: 24 }}>
                            {explanation}
                        </Text>
                    </>
                ) : (
                    <Pressable
                        onPress={() => setShowDetails(true)}
                        style={{
                            backgroundColor: color,
                            padding: 12,
                            borderRadius: 10,
                            width: '80%',
                            marginBottom: 18,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
                            Learn More
                        </Text>
                    </Pressable>
                )}

                <Pressable
                    onPress={() => router.back()}
                    style={{
                        backgroundColor: "#999",
                        padding: 12,
                        borderRadius: 10,
                        width: '80%',
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
                        Got it
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
