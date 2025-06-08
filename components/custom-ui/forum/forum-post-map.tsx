import { View } from "react-native";
import Axios from "axios";
import { useEffect } from "react";
import axios from "axios";
export function ForumPostMap({ location }: { location: string }) {
  useEffect(() => {
    const token = getToken();
  }, []);
  return <View className="flex-1"></View>;
}
const getToken = async () => {
  const url = "https://www.onemap.gov.sg/api/auth/post/getToken";

  // Prepare the data payload
  const data = {
    email: process.env.ONEMAP_EMAIL,
    password: process.env.ONEMAP_EMAIL_PASSWORD,
  };
  await axios
    .post(url, data)
    .then((response) => {
      const token = response.data.access_token; // Extract the token from the response
      return token; // Return the token for further use
      // You can store the token in a state or context for later use
    })
    .catch((error) => {
      console.error(
        "Error fetching token:",
        error.response?.data || error.message
      );
    });
};
const getLongLat = async (location: string) => {
  const url =
    "https://www.onemap.gov.sg/api/common/elastic/search?searchVal=200640&returnGeom=Y&getAddrDetails=Y&pageNum=1";
  const authToken = "**********************"; // Replace with your access token
  Axios.get(url, {
    headers: {
      Authorization: `${authToken}`, // API token for authorization
    },
  })
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
