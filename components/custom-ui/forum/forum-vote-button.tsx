import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { vote } from "~/firebase/VoteApi";
import { ScamReport } from "~/lib/types";
import { useColorScheme } from "~/lib/useColorScheme";
import { useAuth } from "~/lib/useContext/useAuthContext";

export function ForumVoteButton({ scamReport }: { scamReport: ScamReport }) {
  const { uid: userId, user } = useAuth();
  const { colorScheme } = useColorScheme();
  const cantVote = userId === scamReport.createdBy.id;
  const hasUpVoted = scamReport?.votes.some((vote) => {
    return vote.type === "UPVOTE" && vote.voterId === userId;
  });
  const hasDownVoted = scamReport?.votes.some((vote) => {
    return vote.type === "DOWNVOTE" && vote.voterId === userId;
  });

  const onClickUpVote = () => {
    if (!userId) {
      console.error("User is not authenticated");
      return;
    }
    if (cantVote) {
      console.error(scamReport.createdBy.id, userId);
      console.error("User cannot vote on their own report");
      return;
    }
    vote(userId, "UPVOTE", scamReport.id).catch((error) => {
      console.error("Error upvoting:", error);
    });
  };
  const onClickDownVote = () => {
    if (!userId) {
      console.error("User is not authenticated");
      return;
    }
    if (cantVote) {
      console.error("User cannot vote on their own report");
      return;
    }
    vote(userId, "DOWNVOTE", scamReport.id).catch((error) => {
      console.error("Error downvoting:", error);
    });
  };
  return (
    <>
      <Pressable
        className={`px-2 py-1 justify-center items-center border-2 border-gray-300 rounded-l-lg z-10 ${
          hasUpVoted ? "bg-green-200" : ""
        }`}
        onPress={onClickUpVote}
        disabled={cantVote}
      >
        <Text className="text-muted-foreground text-lg">
          <FontAwesome6
            name="thumbs-up"
            size={16}
            color={colorScheme === "light" ? "black" : "white"}
          />{" "}
          {scamReport?.votes.filter((vote) => vote.type == "UPVOTE").length}
        </Text>
      </Pressable>
      <Pressable
        className={`px-2 py-1 justify-center items-center border-2 border-gray-300 rounded-r-lg ${
          hasDownVoted ? "bg-red-200" : ""
        }`}
        onPress={onClickDownVote}
        disabled={cantVote}
      >
        <Text className="text-muted-foreground text-lg">
          {scamReport?.votes.filter((vote) => vote.type == "DOWNVOTE").length}{" "}
          <FontAwesome6
            name="thumbs-down"
            size={16}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </Text>
      </Pressable>
    </>
  );
}
