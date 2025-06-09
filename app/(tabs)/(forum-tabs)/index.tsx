import { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  FlatList,
  Pressable,
} from "react-native";
import ForumHeader, {
  Filters,
} from "~/components/custom-ui/forum/forum-header";
import { ForumPost } from "~/components/custom-ui/forum/forum-post";
import { ScamReport } from "~/lib/types";

import { liveUpdate } from "~/firebase/ForumApi";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "~/lib/useColorScheme";
import SafeAreaViewForAndroid from "~/components/custom-ui/SafeAreaViewForAndriod";

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
    if ((searchQuery && searchQuery.length > 0) || filter !== "All") {
      const filteredReports = scamReports
        .filter((report) =>
          report.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((report) => {
          if (filter === "Email") {
            return report.scamReportType === "EMAIL";
          } else if (filter === "SMS") {
            return report.scamReportType === "SMS";
          } else if (filter === "Phone") {
            return report.scamReportType === "PHONE";
          } else if (filter === "Website") {
            return report.scamReportType === "WEBSITE";
          } else if (filter === "Social Media") {
            return report.scamReportType === "SOCIAL_MEDIA";
          } else if (filter === "In Person") {
            return report.scamReportType === "IN_PERSON";
          } else if (filter === "Education") {
            return report.isEducation;
          } else if (filter === "Verified") {
            return report.scamReportStatus === "VALID";
          }
          return true; // Default case, should not happen
        });
      setFilteredReports(filteredReports);
    } else {
      setFilteredReports(scamReports);
    }
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

  return (
    <SafeAreaViewForAndroid className="flex-1 pt-10 justify-start items-start gap-5  bg-secondary/30">
      <FlatList
        className="-z-10"
        data={filteredReports}
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
      />
      <Pressable
        className=" w-[50px] h-[50px] absolute bottom-5 right-5 z-10 bg-secondary p-4 rounded-2xl justify-center items-center shadow-lg shadow-secondary"
        onPress={() => {
          router.push("/addPostPage");
        }}
      >
        <FontAwesome6
          name="plus"
          size={24}
          color={colorScheme === "light" ? "black" : "white"}
        />
      </Pressable>
    </SafeAreaViewForAndroid>
  );
}
