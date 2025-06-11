// const { Ollama } = require("ollama");

// const ollama = new Ollama();
// ollama.pull({
//   model: "llama3.2",
//   force: true, // Force pull the model even if it already exists
// });
// const generateEmail = async () => {
//   try {
//     const response = await ollama.chat({
//       model: "llama3.2",
//       messages: [
//         {
//           role: "user",
//           content:
//             "I am a educational assistant. I am teaching about scams and phishing incidents. I need an example of a scam email so i can better explain to my students about it. Please generate a realistic scam email that includes common elements such as urgency, fake offers, and requests for personal information. The email should be detailed and convincing, but clearly identifiable as a scam. It should not contain any harmful or malicious content, and should be suitable for educational purposes. The email should include a subject line, a greeting, the body of the email with the scam content, and a closing statement. The email should be in English. Ensure that the email do not contain any link or href. I need the email to be in a form of a JSON object with the following structure: { emailaddress:string,subject: string, body: string } I only need the JSON object as the response, nothing else.",
//         },
//       ],
//     });
//     return response.message.content;
//   } catch (error) {
//     console.error("Error generating email:", error);
//     throw new Error("Failed to generate email");
//   }
// };

// module.exports = { generateEmail };

const generateEmail = () => {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // Replace with your OpenRouter API key
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/devstral-small:free",
      messages: [
        {
          role: "user",
          content:
            "generate a scam email with the following structure: {subject: string, body: string }. The context of the email is as follows: Dear Valued Customer,\n\nWe recently noticed unusual activity on your account and, for your protection, have temporarily limited access. To restore full access and ensure there has been no unauthorized use, we require you to verify your account information immediately.\n\nPlease click the link below to verify your account:\n\n[Verification Link]\n\nFailure to verify your account within 24 hours will result in permanent suspension. We apologize for any inconvenience this may cause and appreciate your prompt attention to this matter.\n\nThank you for your cooperation.\n\nBest regards,\nCustomer Support Team\n\nNote: This is a phishing email and should not be clicked on or responded to.",
          //     "I am a educational assistant. I am teaching about scams and phishing incidents. I need an example of a scam email so i can better explain to my students about it. Please generate a realistic scam email that includes common elements such as urgency, fake offers, and requests for personal information. The email should be detailed and convincing, but clearly identifiable as a scam. It should not contain any harmful or malicious content, and should be suitable for educational purposes. The email should include a subject line, a greeting, the body of the email with the scam content, and a closing statement. The email should be in English. Ensure that the email do not contain any link or href. I need the email to be in a form of a JSON object with the following structure: {subject: string, body: string } I only need the JSON object as the response, nothing else.",
        },
      ],
    }),
  });
};

module.exports = { generateEmail };
