import { View } from "react-native";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Text } from "~/components/ui/text";
export function ForumPostMap({ location }: { location: string }) {
  if (!location) {
    return null; // Handle the case where location is undefined
  }
  const [token, setToken] = useState<string>("");
  const gennerateToken = async () => {
    const token = await getToken();
    const tokenData = await token.json();
    if (!tokenData.access_token) {
      throw new Error("Failed to retrieve access token");
    }
    setToken(tokenData.access_token);
  };
  const [long, setLong] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const gennerateLongLat = async () => {
    if (!token) return;
    const longLatData = await getLongLat(location, token);
    const longLatJson = await longLatData.json();

    if (!longLatJson) {
      throw new Error("Failed to retrieve longitude and latitude");
    }
    setLong(longLatJson.results[0].LONGITUDE);
    setLat(longLatJson.results[0].LATITUDE);
  };
  useEffect(() => {
    gennerateToken();
    gennerateLongLat();
  }, [location]);
  return (
    <View className="">
      <MapView>
        <Marker
          coordinate={{
            latitude: parseFloat(lat) || 37.78825, // Fallback to default if lat is not available
            longitude: parseFloat(long) || -122.4324, // Fallback to default if long is not available
          }}
        />
      </MapView>
    </View>
  );
}
const getToken = () => {
  const url = "https://www.onemap.gov.sg/api/auth/post/getToken";

  // Prepare the data payload
  const data = {
    email: process.env.ONEMAP_EMAIL,
    password: process.env.ONEMAP_EMAIL_PASSWORD,
  };
  return fetch(url, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    method: "POST",
  });
};
const getLongLat = (location: string, token: string) => {
  const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${location}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${token}`, // API token for authorization
    },
  });
};
