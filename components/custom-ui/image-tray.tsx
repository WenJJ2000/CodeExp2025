import { View } from "react-native";
import { PressableImage } from "./pressable-image";
import { useState } from "react";

export default function ImageTray({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <View className="flex flex-row flex-wrap gap-2">
      {images.map((image, index) => (
        <PressableImage
          image={image}
          key={index}
          zoom={selectedImage == image}
          setZoom={(zoom) => {
            if (zoom) {
              setSelectedImage(image);
            } else {
              setSelectedImage(null);
            }
          }}
        />
      ))}
    </View>
  );
}
