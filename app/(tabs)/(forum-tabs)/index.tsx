import { useEffect, useState } from "react";
import { Pressable, ScrollView, View, Image, SafeAreaView } from "react-native";
import ForumHeader, { Filters } from "~/components/custom-ui/forum-header";
import { ForumPost } from "~/components/custom-ui/forum-post";
import { ForumTag } from "~/components/custom-ui/forum-tag";
import { ScamReport, ScamReportStatus, ScamReportType } from "~/lib/types";
import { Text } from "~/components/ui/text";

import { getScamReports, liveUpdate } from "~/firebase/ForumApi";
import ForumPage from "./forumPage";
export default function Screen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Filters>("All");
  const [scamReports, setScamReports] = useState<ScamReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ScamReport | null>(null);
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
    setLoading(false);
  }

  useEffect(() => {
    liveUpdate((data) => {
      fetchScamReports(data);
    });
  }, []);
  useEffect(() => {
    filterScamReports();
  }, [filter, searchQuery, scamReports]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary/30">
        <Text className="text-lg text-muted-foreground">Loading...</Text>
      </View>
    );
  }
  if (selectedReport) {
    return (
      <ForumPage
        scamReport={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    );
  }
  return (
    <SafeAreaView className="flex-1 pt-10 justify-start items-start gap-5  bg-secondary/30">
      <ForumHeader
        searchQuery={searchQuery}
        filter={filter}
        setFilter={setFilter}
        setSearchQuery={setSearchQuery}
      />
      <ScrollView className="flex-1 w-full gap-y-2 -z-30">
        {filteredReports.map((post) => (
          <ForumPost
            scamReport={post}
            key={post.id}
            onClick={() => {
              setSelectedReport(post);
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
