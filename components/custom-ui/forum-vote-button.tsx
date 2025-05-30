import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { ScamReport } from "~/lib/types";
import { useAuth } from "~/lib/useContext/useAuthContext";

export function ForumVoteButton({ scamReport }: { scamReport: ScamReport }) {
  const { uid: userId } = useAuth();

  const hasUpVoted = scamReport?.votes.some(
    (vote) => vote.type === "UPVOTE" && vote.voter === userId
  );
  const hasDownVoted = scamReport?.votes.some(
    (vote) => vote.type === "DOWNVOTE" && vote.voter === userId
  );

  const handleVote = () => {
    const newVotes = hasVoted
      ? votes.filter((id) => id !== userId)
      : [...votes, userId];
    onVoteChange(newVotes);
    // Here you would typically also update the database with the new votes
  };

  return (
    <>
      <Pressable className="px-2 py-1 justify-center items-center border-2 border-gray-300 rounded-l-lg">
        <Text className="text-muted-foreground text-lg">
          <FontAwesome6 name="thumbs-up" size={16} />{" "}
          {scamReport?.votes.filter((vote) => vote.type == "UPVOTE").length}
        </Text>
      </Pressable>
      <Pressable className="px-2 py-1 justify-center items-center border-2 border-gray-300 rounded-r-lg">
        <Text className="text-muted-foreground text-lg">
          {scamReport?.votes.filter((vote) => vote.type == "DOWNVOTE").length}{" "}
          <FontAwesome6 name="thumbs-down" size={16} />
        </Text>
      </Pressable>
    </>
  );
}
