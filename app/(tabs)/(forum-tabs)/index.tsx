import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { ForumPost } from "~/components/custom-ui/forum/forum-post";
import { Filters, ScamReport } from "~/lib/types";

import { FontAwesome6 } from "@expo/vector-icons";
import { useGlobalSearchParams, useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import SafeAreaViewForAndroid from "~/components/custom-ui/SafeAreaViewForAndriod";
import { liveUpdate } from "~/firebase/ForumApi";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text } from "~/components/ui/text";
export default function Index() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Filters>("All");
  const [scamReports, setScamReports] = useState<ScamReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<ScamReport[]>([]);
  const { _queries, _filters } = useGlobalSearchParams();
  useEffect(() => {
    setSearchQuery(_queries as string);
    if (_filters) {
      setFilter(_filters as Filters);
    }
  }, [_queries, _filters]);
  function filterScamReports() {
    let filteredReports = scamReports;
    if (filter !== "All") {
      filteredReports = filteredReports.filter((report) => {
        if (filter === "EMAIL") {
          return report.scamReportType === "EMAIL";
        } else if (filter === "SMS") {
          return report.scamReportType === "SMS";
        } else if (filter === "PHONE") {
          return report.scamReportType === "PHONE";
        } else if (filter === "SOCIAL_MEDIA") {
          return report.scamReportType === "SOCIAL_MEDIA";
        } else if (filter === "WEBSITE") {
          return report.scamReportType === "WEBSITE";
        } else if (filter === "IN_PERSON") {
          return report.scamReportType === "IN_PERSON";
        } else if (filter === "APP") {
          return report.scamReportType === "APP";
        } else if (filter === "EDUCATION") {
          return report.isEducation;
        } else if (filter === "VERIFIED") {
          return report.scamReportStatus === "VALID";
        }
        return false; // Default case, should not happen
      });
    }
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filteredReports = filteredReports.filter((report) => {
        return report.title.toLowerCase().includes(searchLower);
      });
    }
    setFilteredReports(filteredReports);
  }
  async function fetchScamReports(reports: ScamReport[] = []) {
    setScamReports(reports);
    filterScamReports();
  }

  useEffect(() => {
    liveUpdate((data) => {
      fetchScamReports(data);
    });
  }, []);
  useEffect(() => {
    filterScamReports();
  }, [filter, searchQuery, scamReports]);
  const ref = useRef(null as FlatList<ScamReport> | null);

  const scrollToIndex = (index: number) => {
    ref?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };
  return (
    <SafeAreaViewForAndroid className="flex-1 pt-10 justify-start items-center gap-5  bg-secondary/30">
      {filter == "IN_PERSON" && (
        <MapView style={{ width: "100%", height: "40%" }}>
          {filteredReports.map((report) => {
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
                  onPress={() => {
                    // alert("Marker Pressed");
                    filteredReports.findIndex(
                      (item) => item.id === report.id
                    ) !== -1
                      ? scrollToIndex(
                          filteredReports.findIndex(
                            (item) => item.id === report.id
                          )
                        )
                      : scrollToIndex(0);
                    // router.push({
                    //   pathname: "/forumPage",
                    //   params: { scamReportId: report.id },
                    // });
                  }}
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
      )}
      {filteredReports.length === 0 && (
        <View className=" flex-1 justify-center items-center gap-2">
          <FontAwesome6 name="exclamation-triangle" size={24} color="red" />
          <Text className="text-lg text-muted-foreground">
            No scam reports found.
          </Text>
        </View>
      )}
      {filteredReports.length > 0 && (
        <FlatList
          ref={ref}
          data={filteredReports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ForumPost
                scamReport={item}
                onClick={() => {
                  router.push({
                    pathname: "/forumPage",
                    params: { scamReportId: item.id },
                  });
                }}
              />
            );
          }}
          initialNumToRender={1000}
          maxToRenderPerBatch={1000}
          windowSize={1000}
        />
      )}
      <Pressable
        className=" w-[50px] h-[50px] absolute bottom-5 right-5 z-10 bg-primary p-4 rounded-2xl justify-center items-center shadow-lg shadow-secondary"
        onPress={() => {
          router.push("/addPostPage");
        }}
      >
        <FontAwesome6 name="plus" size={24} color="white" />
      </Pressable>
    </SafeAreaViewForAndroid>
  );
}
