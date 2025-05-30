import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { vote } from "~/firebase/VoteApi";
import { ScamReport } from "~/lib/types";
import { useAuth } from "~/lib/useContext/useAuthContext";

export function ForumVoteButton({ scamReport }: { scamReport: ScamReport }) {
  const { uid: userId, user } = useAuth();

  const hasUpVoted = scamReport?.votes.some(
    (vote) => vote.type === "UPVOTE" && vote.voter.id === userId
  );
  const hasDownVoted = scamReport?.votes.some(
    (vote) => vote.type === "DOWNVOTE" && vote.voter.id === userId
  );

  const onClickUpVote = () => {
    if (!userId) {
      console.error("User is not authenticated");
      return;
    }
    if (hasUpVoted) {
      scamReport.votes.filter(
        (vote) => vote.type === "UPVOTE" && vote.voter.id === userId
      );
    } else {
      scamReport.votes.push({
        type: "UPVOTE",
        voter: JSON.parse(user || "{}"), // Assuming you have a way to get the username
        id: `vote-${Date.now()}-${Math.random()}`, // Generate a unique ID for the vote
      });
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
    if (hasDownVoted) {
      scamReport.votes.filter(
        (vote) => vote.type === "DOWNVOTE" && vote.voter.id === userId
      );
    } else {
      scamReport.votes.push({
        type: "DOWNVOTE",
        voter: JSON.parse(user || "{}"), // Assuming you have a way to get the username
        id: `vote-${Date.now()}-${Math.random()}`, // Generate a unique ID for the vote
      });
    }
    vote(userId, "DOWNVOTE", scamReport.id).catch((error) => {
      console.error("Error downvoting:", error);
    });
  };
  return (
    <>
      <Pressable
        className="px-2 py-1 justify-center items-center border-2 border-gray-300 rounded-l-lg"
        onPress={onClickUpVote}
      >
        <Text className="text-muted-foreground text-lg">
          <FontAwesome6 name="thumbs-up" size={16} />{" "}
          {scamReport?.votes.filter((vote) => vote.type == "UPVOTE").length}
        </Text>
      </Pressable>
      <Pressable
        className="px-2 py-1 justify-center items-center border-2 border-gray-300 rounded-r-lg"
        onPress={onClickDownVote}
      >
        <Text className="text-muted-foreground text-lg">
          {scamReport?.votes.filter((vote) => vote.type == "DOWNVOTE").length}{" "}
          <FontAwesome6 name="thumbs-down" size={16} />
        </Text>
      </Pressable>
    </>
  );
}
