import { Platform, View } from "react-native";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Text } from "~/components/ui/text";
import { getLongLat, getToken } from "~/firebase/OneMapApi";
export function ForumPostMap({ location }: { location: string }) {
  if (!location) {
    return <></>; // Handle the case where location is undefined
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
    console.log("Location:", location);
  }, [location]);
  return (
    <View className="">
      <MapView
        className="w-full h-64"
        mapType={Platform.OS == "android" ? "none" : "standard"}
      >
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
