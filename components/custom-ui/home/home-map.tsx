import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { liveUpdate } from "~/firebase/ForumApi";
import { ScamReport } from "~/lib/types";
import { useRouter } from "expo-router";
import * as Location from "expo-location";

export default function HomeMap() {
  const [scamReports, setScamReports] = useState<ScamReport[]>([]);
  const router = useRouter();
  useEffect(() => {
    const unsub = liveUpdate((data) => {
      setScamReports(
        data.filter((report) => report.scamReportType == "IN_PERSON")
      );
    });
    return () => {
      unsub();
    };
  }, [scamReports]);

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
      region={{
        latitude: location?.coords?.latitude || 1.3521,
        longitude: location?.coords?.longitude || 103.8198,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      }}
    >
      {scamReports.map((report) => {
        // console.log("Report");
        // console.log(
        //   "Report",
        //   report.id,
        //   report?.location?.latitude,
        //   report?.location?.longitude
        // );
        return (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report?.location?.latitude || 0,
              longitude: report?.location?.longitude || 0,
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
      })}
    </MapView>
  );
}
