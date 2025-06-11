export async function checkImageForScam(image) {
  try {
    const data = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Replace with your OpenRouter API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
                                Include a confidence level on how likely it is a scam.`,
              },
              {
                type: 'image_url',
                url: image,
              },
            ],
          },
        ],
      }),
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch ai');
  }
}
