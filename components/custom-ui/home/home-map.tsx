import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { liveUpdate } from "~/firebase/ForumApi";
import { ScamReport } from "~/lib/types";
import { View } from "react-native";

export default function HomeMap() {
  const [scamReports, setScamReports] = useState<ScamReport[]>([]);
  useEffect(() => {
    liveUpdate((data) => {
      setScamReports(
        data.filter((report) => report.scamReportType == "IN_PERSON")
      );
    });
  }, []);
  return (
    <MapView style={{ width: "100%", height: "40%" }}>
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
            />
          );
        }
        return null; // Skip markers without location
      })}
    </MapView>
  );
}
