import { useState } from "react";
import { Pressable, Image } from "react-native";

export function PressableImage({
  image,
  zoom,
  setZoom,
}: {
  image: string;
  zoom?: boolean;
  setZoom?: (zoom: boolean) => void;
}) {
  const [isZoom, setIsZoom] = useState(false);
  const _zoom = zoom ?? isZoom;
  const _setZoom = setZoom ?? setIsZoom;
  return (
    <Pressable
      onPress={() => {
        _setZoom(!_zoom);
      }}
      className={`
        ${_zoom ? "w-60 h-60" : " w-20 h-20"} `}
    >
      <Image
        source={{ uri: `data:image/jpeg;base64,${image}` }}
        className={`
          ${
            _zoom ? "w-60 h-60" : " w-20 h-20"
          } animate-transform transition-transform duration-300 ease-in-out
          rounded-lg border-2 border-gray-300`}
        resizeMode="cover"
      />
    </Pressable>
  );
}
