import { useState } from "react";
import { Pressable, Image } from "react-native";

export function ForumReplyImage({ image }: { image: string }) {
  const [zoom, setZoom] = useState(false);
  return (
    <Pressable
      onPress={() => {
        setZoom(!zoom);
      }}
    >
      <Image
        source={{ uri: `data:image/jpeg;base64,${image}` }}
        className={`
          ${
            zoom ? "w-60 h-60" : " w-20 h-20"
          } animate-transform transition-transform duration-300 ease-in-out
          rounded-lg border-2 border-gray-300`}
        resizeMode="cover"
      />
    </Pressable>
  );
}
