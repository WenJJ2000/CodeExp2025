const { collection, getDocs } = require("firebase/firestore");
const { db } = require("./firebase");

async function getAllUser() {
  try {
    const snapshot = await db
      .collection("users")
      .where("notificationSettings.email", "==", true)
      .get();
    const users = [];
    snapshot.forEach((doc) => {
      const userData = doc.data();
      userData.id = doc.id; // Add the document ID to the user data
      users.push({
        id: userData.id,
        email: userData.email,
        username: userData.username,
        notificationSettings: userData.notificationSettings,
      });
    });
    return users;
  } catch (error) {
    console.error("Error initializing Firebase:", error.toString());
    throw new Error("Failed to initialize Firebase");
  }
}
module.exports = { getAllUser };
