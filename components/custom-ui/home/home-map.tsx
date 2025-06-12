import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { liveUpdate } from "~/firebase/ForumApi";
import { ScamReport } from "~/lib/types";
import { View } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";

export default function HomeMap() {
  const [scamReports, setScamReports] = useState<ScamReport[]>([]);
  const router = useRouter();
  useEffect(() => {
    liveUpdate((data) => {
      setScamReports(
        data.filter((report) => report.scamReportType == "IN_PERSON")
      );
    });
  }, []);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    getCurrentLocation();
  }, []);
  return (
    <MapView
      style={{ width: "100%", height: "40%" }}
      region={
        location
          ? {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }
          : undefined
      }
    >
      {scamReports.map((report) => {
        if (report.location !== undefined && report.location !== null) {
          return (
            <Marker
              key={report.id}
              coordinate={{
                latitude: report.location.latitude,
                longitude: report.location.longitude,
              }}
              title={report.title}
              description={`Posted by ${report.createdBy.username}`}
              pinColor={
                report.scamReportStatus === "VALID"
                  ? "green"
                  : report.scamReportStatus === "INVALID"
                  ? "red"
                  : "blue"
              }
              style={{
                width: 50,
                height: 50,
              }}
              onPress={() => {
                router.push({
                  pathname: "/forumPage",
                  params: { scamReportId: report.id },
                });
              }}
            />
          );
        }
        return <></>; // Skip markers without location
      })}
    </MapView>
  );
}
