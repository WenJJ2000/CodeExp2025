// const { Ollama } = require("ollama");

// // const ollama = new Ollama();
// // ollama.pull({
// //   model: "llama3.2",
// //   force: true, // Force pull the model even if it already exists
// // });
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
