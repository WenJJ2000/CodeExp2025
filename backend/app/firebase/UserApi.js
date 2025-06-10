const { collection, getDocs } = require("firebase/firestore");
const { db } = require("./firebase");

async function getAllUser() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched users:", users);
    if (users.length === 0) {
      console.log("No users found in the database.");
    } else {
      console.log(`Total users fetched: ${users.length}`);
    }
    return users;
  } catch (error) {
    console.error("Error initializing Firebase:", error.toString());
    throw new Error("Failed to initialize Firebase");
  }
}
module.exports = { getAllUser };
