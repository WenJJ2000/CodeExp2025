import OpenAI from 'openai';

// export async function checkImageForScam(image) {
//   try {
//     const data = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`, // Replace with your OpenRouter API key
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'meta-llama/llama-3.3-8b-instruct:free',
//         messages: [
//   {
//     role: 'user',
//     content: [
//       {
//         type: 'text',
//         text: `I am a scam detective. I am trying to find out whether this image is a scam,
//                         Generate a report on the image given and give me all the details and parts on the image which may
//                         have been modified or AI generated. This should include any anomaly no matter how small
//                         Include a confidence level on how likely it is a scam.`,
//       },
//       {
//         type: 'image_url',
//         url: image,
//       },
//     ],
//   },
//         ],
//       }),
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error('Failed to fetch ai');
//   }
// }
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey:
    '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',
});
export async function checkImageForScam(image) {
  const completion = await openai.chat.completions.create({
    model: 'meta-llama/llama-3.3-8b-instruct:free',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `I am a scam detective. I am trying to find out whether this image is a scam,
                    Generate a report on the image given and give me all the details and parts on the image which may
                    have been modified or AI generated. This should include any anomaly no matter how small
                    Include a confidence level on how likely it is a scam. Give me the reply in a json string only in the format
                    {isScam: boolean, reasons: string[], confidence: number} and nothing else`,
          },
          {
            type: 'image_url',
            url: image,
          },
        ],
      },
    ],
  });
  console.log(completion.choices[0].message);
  return completion;
}
