import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});
export async function checkImageForScam(image, description) {
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
          {
            type: 'text',
            text: `Here is a description of the image as well to help aid in your detection : ${description}`,
          },
        ],
      },
    ],
  });
  console.log(completion.choices[0].message);
  return completion;
}
export async function generateTitleAndDescription(description) {
  const completion = await openai.chat.completions.create({
    model: 'meta-llama/llama-3.3-8b-instruct:free',
    model: 'mistralai/devstral-small:free',
    messages: [
      {
        role: 'user',
        content:
          'Generate a concise title and description for a scam report based on the following description:\n\n' +
          description +
          '\n\n If there is a phone number or email address, it should be in the title. Please provide the title and description in the following JSON format:\n\n' +
          `{"title": "Your Title Here", "description": "Your Description Here"}`,
      },
    ],
  });
  console.log(completion.choices[0].message);
  return completion;
}
