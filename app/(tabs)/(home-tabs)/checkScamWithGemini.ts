// checkScamWithGemini.ts
import { GEMINI_API_KEY } from '@env';
console.log("Gemini Key: ", GEMINI_API_KEY); // <--- REMOVE THIS after test

export async function checkScamMessage(input: string): Promise<string> {
    const prompt = `
You are a scam detector. Analyze the message below and respond ONLY with "Scam" or "Not a scam", followed by a short reason.

Message:
"""
${input}
"""`;

    const body = {
        contents: [
            {
                role: 'user',
                parts: [{ text: prompt }],
            },
        ],
    };

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }
    );

    if (!response.ok) {
        const err = await response.json();
        console.error('Gemini API Error:', err);
        throw new Error(err.error?.message || 'Unknown error');
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return aiText || 'No response from AI';
}
