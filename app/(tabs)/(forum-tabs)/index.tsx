import { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, View, FlatList } from "react-native";
import ForumHeader, { Filters } from "~/components/custom-ui/forum-header";
import { ForumPost } from "~/components/custom-ui/forum-post";
import { ScamReport } from "~/lib/types";

import { liveUpdate } from "~/firebase/ForumApi";
import { useRouter } from "expo-router";
export default function Screen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Filters>("All");
  const [scamReports, setScamReports] = useState<ScamReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<ScamReport[]>([]);

  function filterScamReports() {
    if (searchQuery.length > 0 || filter !== "All") {
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
          } else if (filter === "Misinformation") {
            return report.scamReportType === "MISINFORMATION";
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
    <SafeAreaView className="flex-1 pt-10 justify-start items-start gap-5  bg-secondary/30">
      <ForumHeader
        searchQuery={searchQuery}
        filter={filter}
        setFilter={setFilter}
        setSearchQuery={setSearchQuery}
      />
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
    </SafeAreaView>
  );
}
