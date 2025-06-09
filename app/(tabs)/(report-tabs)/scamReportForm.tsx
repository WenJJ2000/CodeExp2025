import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import { GOOGLE_VISION_API_KEY } from "@env";
import { ScamReportType } from "~/lib/types";
import { createReport } from "../../../firebase/ScamReportApi";
import { auth } from "../../../firebase/firebase";
import { getLongLat, getToken } from "~/firebase/OneMapApi";
import MapView, { Marker } from "react-native-maps";

const ScamCategoryMap: Record<ScamReportType, string> = {
  EMAIL: "email",
  SMS: "sms",
  PHONE: "phone",
  SOCIAL_MEDIA: "social",
  WEBSITE: "website",
  IN_PERSON: "inPerson",
  APP: "app",
};

const SCAM_CONFIG: Record<
  ScamReportType,
  {
    senderLabel: string;
    titleLabel?: string;
    contentLabel: string;
  }
> = {
  EMAIL: {
    senderLabel: "Input Email",
    titleLabel: "What was the email title?",
    contentLabel: "What was the email message?",
  },
  SMS: {
    senderLabel: "Phone number",
    titleLabel: "SMS title",
    contentLabel: "SMS content",
  },
  PHONE: {
    senderLabel: "Caller number",
    contentLabel: "Call content / summary",
  },
  SOCIAL_MEDIA: {
    senderLabel: "Username / Profile name",
    contentLabel: "What message was sent?",
  },
  WEBSITE: {
    senderLabel: "URL of the website",
    contentLabel: "What was suspicious?",
  },
  IN_PERSON: {
    senderLabel: "Description of scammer",
    contentLabel: "What happened?",
  },
  APP: {
    senderLabel: "App name or developer",
    contentLabel: "What did the app do?",
  },
};

export default function ScamReportForm() {
  const [step, setStep] = useState(1);
  const [scamType, setScamType] = useState<ScamReportType>("EMAIL");
  const [formData, setFormData] = useState({
    sender: "",
    title: "",
    content: "",
    location: "",
  });
  const [errors, setErrors] = useState({
    sender: "",
    title: "",
    content: "",
    location: "",
  });
  const [locationLongLat, setLocationLongLat] = useState<{
    longitude: number;
    latitude: number;
  }>({
    longitude: 0,
    latitude: 0,
  });
  const [oneMapToken, setOneMapToken] = useState<string>("");
  const isDark = useColorScheme() === "dark";
  const config = SCAM_CONFIG[scamType];
  const user = auth.currentUser;
  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    setFormData({ sender: "", title: "", content: "", location: "" });
    setErrors({ sender: "", title: "", content: "", location: "" });
    setExtractedText("");
    setImages([]);
    setLocationLongLat({
      longitude: 0,
      latitude: 0,
    });
    if (oneMapToken === "") {
      getToken()
        .then((data) => data.json())
        .then((tokenData) => {
          if (tokenData.access_token) {
            setOneMapToken(tokenData.access_token);
          } else {
            Alert.alert("Error", "Failed to retrieve OneMap token.");
          }
        });
    }
  }, [scamType]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back", // Changes the text next to the back arrow (iOS only)
      title: "Scam Report", // Changes the current screen's title
      headerBackTitleVisible: true, // Optional: make sure it's visible
    });
  }, []);

  const [image, setImage] = useState<string | null>(null); // for preview
  const [imageBase64, setImageBase64] = useState<string | null>(null); // for storage
  const [extractedText, setExtractedText] = useState("");
  // Bottom images for evidence (array)
  const [images, setImages] = useState<{ uri: string; base64: string }[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const base64 = result.assets[0].base64 ?? null;

      setImage(uri);
      setImageBase64(base64);

      if (base64) {
        extractTextFromImage(base64); // autofill content
      }
    }
  };

  const pickEvidenceImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
      allowsMultipleSelection: true, // Only works on web, but you can handle manually
    });

    if (!result.canceled && result.assets.length > 0) {
      // Add all selected images to array
      setImages((prev) => [
        ...prev,
        ...result.assets.map((asset) => ({
          uri: asset.uri,
          base64: asset.base64 ?? "",
        })),
      ]);
    }
  };

  const extractTextFromImage = async (base64Image: string) => {
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: "TEXT_DETECTION",
                  },
                ],
              },
            ],
          }),
        }
      );

      const result = await response.json();
      const text =
        result.responses?.[0]?.fullTextAnnotation?.text || "No text found";
      setExtractedText(text);
      setFormData((prev) => ({ ...prev, content: text })); // <-- autofill content field
    } catch (err) {
      console.error("Failed to extract text:", err);
      Alert.alert("Error", "Failed to extract text from image.");
    }
  };

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (validateStep() && step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    const isValid = validateStep();
    if (!isValid) return;

    try {
      await createReport({
        scamReportType: scamType,
        sender: formData.sender,
        title: formData.title,
        content: formData.content,
        location: { postalCode: formData.location, ...locationLongLat },
        createdBy: user?.uid ?? "anonymous",
        images: images.map((img) => img.base64),
      });
      setStep(5);
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const validateStep = (): boolean => {
    const newErrors = { sender: "", title: "", content: "", location: "" };
    let isValid = true;

    if (step === 2) {
      // Validate Sender
      if (!formData.sender.trim()) {
        newErrors.sender = "This field is required.";
        isValid = false;
      } else {
        switch (scamType) {
          case "EMAIL":
            if (
              !/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                formData.sender.trim()
              )
            ) {
              newErrors.sender = "Must be a valid email address.";
              isValid = false;
            }
            break;
          case "SMS":
          case "PHONE":
            if (!/^\d{8}$/.test(formData.sender.trim())) {
              newErrors.sender = "Must be 8-digit number.";
              isValid = false;
            }
            break;
          case "WEBSITE":
            if (
              !/^((https?:\/\/)?www\.[\w.-]+\.[a-zA-Z]{2,})(\/\S*)?$/i.test(
                formData.sender.trim()
              )
            ) {
              newErrors.sender = "Enter a valid website (must start with www.)";
              isValid = false;
            }
            break;
          // Optionally add more:
          case "SOCIAL_MEDIA":
          case "APP":
            if (formData.sender.trim().length < 3) {
              newErrors.sender = "Too short.";
              isValid = false;
            }
            break;
          case "IN_PERSON":
            if (formData.sender.trim().length < 3) {
              newErrors.sender = "Too short.";
              isValid = false;
            }
            // Singapore postal code validation (6 digits)
            if (!/^\d{6}$/.test(formData.location)) {
              newErrors.location = "Please enter a valid 6-digit postal code.";
              isValid = false;
            }
            break;
        }
      }

      // Validate Title if present
      if (config.titleLabel && !formData.title.trim()) {
        newErrors.title = "This field is required.";
        isValid = false;
      }
    } else if (step === 3) {
      // Validate Content
      if (!formData.content.trim()) {
        newErrors.content = "This field is required.";
        isValid = false;
      } else if (formData.content.trim().length < 10) {
        newErrors.content = "Please provide more details.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleLocation = (text: string) => {
    getLongLat(text, oneMapToken)
      .then((data) => data.json())
      .then((longLatData) => {
        if (longLatData.results && longLatData.results.length > 0) {
          const result = longLatData.results[0];
          setLocationLongLat({
            longitude: parseFloat(result.LONGITUDE),
            latitude: parseFloat(result.LATITUDE),
          });
        } else {
          setLocationLongLat({ longitude: 0, latitude: 0 });
        }
      });
  };
  return (
    <ScrollView
      className={`flex-1 px-5 pt-10 ${isDark ? "bg-black" : "bg-white"}`}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Step indicator */}
      <View className="flex-row justify-between mb-6">
        {[1, 2, 3, 4].map((s) => (
          <View
            key={s}
            className={`h-2 flex-1 mx-1 rounded-full ${
              s <= step ? "bg-blue-600" : isDark ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      {/* Step 1: Scam type */}
      {step === 1 && (
        <>
          <Text
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            What would you like to report?
          </Text>
          {(Object.keys(SCAM_CONFIG) as ScamReportType[]).map((type) => (
            <TouchableOpacity
              key={type}
              className={`border rounded-xl py-4 mb-3 items-center ${
                isDark ? "border-gray-500" : "border-black"
              } ${scamType === type ? "bg-blue-100 dark:bg-blue-900" : ""}`}
              onPress={() => setScamType(type)}
            >
              <Text
                className={`capitalize text-lg ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {ScamCategoryMap[type].replace(/([A-Z])/g, " $1")} scam
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {/* Step 2: Sender + Title */}
      {step === 2 && (
        <>
          {/* <TouchableOpacity
                        onPress={pickImage}
                        className={`border rounded-lg p-4 mb-3 items-center ${isDark ? "border-gray-500 bg-gray-900" : "border-black bg-white"}`}
                    >
                        <Ionicons name="camera" size={24} color={isDark ? "white" : "black"} />
                        <Text className={`${isDark ? "text-white" : "text-black"}`}>
                            Upload Image to Extract Text
                        </Text>
                    </TouchableOpacity>

                    {extractedText ? (
                        <View className="mt-2 p-3 border rounded bg-gray-100 dark:bg-gray-800">
                            <Text className={`${isDark ? "text-white" : "text-black"}`}>
                                Extracted Text:
                            </Text>
                            <Text className="mt-1 italic text-sm text-gray-700 dark:text-gray-300">
                                {extractedText}
                            </Text>
                        </View>
                    ) : null}

                    <Text className={`text-center text-lg mb-2 ${isDark ? "text-white" : "text-black"}`}>
                        OR
                    </Text> */}

          <Text
            className={`text-base mb-2 ${isDark ? "text-white" : "text-black"}`}
          >
            {config.senderLabel}
          </Text>
          <TextInput
            value={formData.sender}
            onChangeText={(text) => {
              let filtered = text;
              // For phone/sms types, restrict to 8 digits
              if (scamType === "SMS" || scamType === "PHONE") {
                filtered = text.replace(/[^0-9]/g, "").slice(0, 8);
              }
              updateField("sender", filtered);
              setErrors((prev) => ({ ...prev, sender: "" }));
            }}
            keyboardType={
              scamType === "SMS" || scamType === "PHONE" ? "numeric" : "default"
            }
            maxLength={
              scamType === "SMS" || scamType === "PHONE" ? 8 : undefined
            }
            className={`border rounded-lg p-3 mb-1
                            ${
                              errors.sender
                                ? "border-red-500"
                                : isDark
                                ? "border-gray-600"
                                : "border-gray-400"
                            }
                            ${
                              isDark
                                ? "text-white bg-gray-900"
                                : "text-black bg-white"
                            }
                        `}
            placeholder={config.senderLabel}
            placeholderTextColor={isDark ? "#999" : "#666"}
          />
          {errors.sender ? (
            <Text className="text-red-500 text-sm mb-3">{errors.sender}</Text>
          ) : null}

          {scamType === "IN_PERSON" && (
            <>
              <Text
                className={`text-base mb-2 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Postal code where it happened
              </Text>
              <TextInput
                value={formData.location}
                onChangeText={(text) => {
                  const filtered = text.replace(/[^0-9]/g, "").slice(0, 6);
                  updateField("location", filtered);
                  handleLocation(filtered);
                  setErrors((prev) => ({ ...prev, location: "" }));
                }}
                keyboardType="numeric"
                maxLength={6}
                className={`border rounded-lg p-3 mb-1
                  ${
                    errors.location
                      ? "border-red-500"
                      : isDark
                      ? "border-gray-600"
                      : "border-gray-400"
                  }
                  ${isDark ? "text-white bg-gray-900" : "text-black bg-white"}
                mb-4`}
                placeholder="Enter postal code"
                placeholderTextColor={isDark ? "#999" : "#666"}
              />
              <MapView
                className="w-full h-64 mb-4"
                style={{ borderRadius: 12, width: "100%", height: 250 }}
                mapType="standard"
                showsMyLocationButton={true}
                showsCompass={true}
                showsScale={true}
                showsPointsOfInterest={true}
                showsTraffic={true}
                showsIndoors={true}
                showsBuildings={true}
                showsUserLocation={true}
                initialRegion={{
                  latitude: 1.3521, // Default to Singapore
                  longitude: 103.8198,
                  latitudeDelta: 0.15,
                  longitudeDelta: 0.15,
                }}
                followsUserLocation={true}
              >
                {locationLongLat.latitude !== 0 &&
                  locationLongLat.longitude !== 0 && (
                    <Marker
                      coordinate={{
                        latitude: locationLongLat.latitude,
                        longitude: locationLongLat.longitude,
                      }}
                      title="Scam Location"
                    />
                  )}
              </MapView>
              {errors.location ? (
                <Text className="text-red-500 text-sm mb-3">
                  {errors.location}
                </Text>
              ) : null}
            </>
          )}

          {config.titleLabel && (
            <>
              <Text
                className={`text-base mb-2 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {config.titleLabel}
              </Text>
              <TextInput
                value={formData.title}
                onChangeText={(text) => {
                  updateField("title", text);
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
                className={`border rounded-lg p-3 mb-1 ${
                  errors.title
                    ? "border-red-500"
                    : isDark
                    ? "bg-gray-900 text-white border-gray-600"
                    : "bg-white text-black border-gray-400"
                }`}
                placeholder={config.titleLabel}
                placeholderTextColor={isDark ? "#999" : "#666"}
              />
              {errors.title ? (
                <Text className="text-red-500 text-sm mb-3">
                  {errors.title}
                </Text>
              ) : null}
            </>
          )}
        </>
      )}

      {/* Step 3: Content */}
      {step === 3 && (
        <>
          <TouchableOpacity
            onPress={pickImage}
            className={`border rounded-lg p-4 mb-3 items-center ${
              isDark ? "border-gray-500 bg-gray-900" : "border-black bg-white"
            }`}
          >
            <Ionicons
              name="camera"
              size={24}
              color={isDark ? "white" : "black"}
            />
            <Text className={`${isDark ? "text-white" : "text-black"}`}>
              Upload Image to Extract Text
            </Text>
          </TouchableOpacity>

          {/* {extractedText ? (
            <View className="mt-2 p-3 border rounded bg-gray-100 dark:bg-gray-800">
              <Text className={`${isDark ? "text-white" : "text-black"}`}>
                Extracted Text:
              </Text>
              <Text className="mt-1 italic text-sm text-gray-700 dark:text-gray-300">
                {extractedText}
              </Text>
            </View>
          ) : null} */}

          <Text
            className={`text-center text-lg mb-2 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            OR
          </Text>

          <Text
            className={`text-base mb-2 ${isDark ? "text-white" : "text-black"}`}
          >
            {config.contentLabel}
          </Text>
          <TextInput
            value={formData.content}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            onChangeText={(text) => {
              updateField("content", text);
              setErrors((prev) => ({ ...prev, content: "" }));
            }}
            className={`border rounded-lg p-3 mb-1 ${
              errors.content
                ? "border-red-500"
                : isDark
                ? "bg-gray-900 text-white border-gray-600"
                : "bg-white text-black border-gray-400"
            }`}
            placeholder={config.contentLabel}
            placeholderTextColor={isDark ? "#999" : "#666"}
          />
          {errors.content ? (
            <Text className="text-red-500 text-sm mb-3">{errors.content}</Text>
          ) : null}

          <View className="mt-6">
            <Text
              className={`text-base font-semibold mb-2 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Upload Additional Images (optional)
            </Text>
            <TouchableOpacity
              onPress={pickEvidenceImage}
              className={`border rounded-lg p-4 mb-3 items-center ${
                isDark ? "border-gray-500 bg-gray-900" : "border-black bg-white"
              }`}
            >
              <Ionicons
                name="camera"
                size={24}
                color={isDark ? "white" : "black"}
              />
              <Text className={`${isDark ? "text-white" : "text-black"}`}>
                Upload Evidence Image
              </Text>
            </TouchableOpacity>

            {images.length > 0 && (
              <View className="flex-row flex-wrap">
                {images.map((img, idx) => (
                  <View
                    key={idx}
                    className="mt-2 p-3 border rounded bg-gray-100 dark:bg-gray-800 items-center"
                  >
                    <Text className={`${isDark ? "text-white" : "text-black"}`}>
                      Evidence Image {idx + 1}:
                    </Text>
                    <View
                      style={{ width: 200, height: 200, marginVertical: 8 }}
                    >
                      <Image
                        source={{ uri: img.uri }}
                        style={{ width: 200, height: 200, borderRadius: 8 }}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setImages((prev) => prev.filter((_, i) => i !== idx))
                        }
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          zIndex: 2,
                          backgroundColor: "rgba(255,0,0,0.8)",
                          borderRadius: 12,
                          width: 16,
                          height: 16,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons name="close" size={12} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </>
      )}

      {step === 4 && (
        <>
          <Text
            className={`text-xl font-bold mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Preview
          </Text>
          <Text className={`mb-2 ${isDark ? "text-white" : "text-black"}`}>
            <Text className="font-semibold">Type of scam: </Text>
            {scamType}
          </Text>
          <Text className={`mb-2 ${isDark ? "text-white" : "text-black"}`}>
            <Text className="font-semibold">Sender: </Text>
            {formData.sender}
          </Text>
          {config.titleLabel && (
            <Text className={`mb-2 ${isDark ? "text-white" : "text-black"}`}>
              <Text className="font-semibold">Title: </Text>
              {formData.title}
            </Text>
          )}
          <Text
            className={`mb-2 font-semibold ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Message:
          </Text>
          <Text
            className={`border rounded-md p-3 ${
              isDark
                ? "bg-gray-900 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {formData.content}
          </Text>

          {images.length > 0 && (
            <View className="flex-row flex-wrap">
              {images.map((img, idx) => (
                <View
                  key={idx}
                  className="mt-2 p-3 border rounded bg-gray-100 dark:bg-gray-800 items-center"
                >
                  <Text className={`${isDark ? "text-white" : "text-black"}`}>
                    Evidence Image {idx + 1}:
                  </Text>
                  <View style={{ width: 200, height: 200, marginVertical: 8 }}>
                    <Image
                      source={{ uri: img.uri }}
                      style={{ width: 200, height: 200, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setImages((prev) => prev.filter((_, i) => i !== idx))
                      }
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        zIndex: 2,
                        backgroundColor: "rgba(255,0,0,0.8)",
                        borderRadius: 12,
                        width: 16,
                        height: 16,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name="close" size={12} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </>
      )}

      {/* Step 5: Confirmation */}
      {step === 5 && (
        <View className="flex-1 justify-between p-6 bg-white dark:bg-black rounded-3xl shadow-lg mx-4 my-3">
          {/* Icon at top */}
          <View className="items-center mb-8">
            <Image
              source={require("../../../assets/images/ScamBustersLogo.png")}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          </View>

          {/* Text content */}
          <View className="items-center mb-12">
            <Text className="text-2xl font-bold text-center text-black dark:text-white mb-2">
              Your report has been submitted!
            </Text>
            <Text className="text-center text-gray-600 dark:text-gray-400">
              We are in the midst of reviewing your submission.
            </Text>
          </View>

          {/* Got it button */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/(report-tabs)")}
            className="bg-blue-600 py-4 rounded-lg"
            style={{ width: "100%" }}
          >
            <Text className="text-white text-center text-lg">Got it</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Navigation */}
      {step < 5 && (
        <View className="mt-6 flex-row justify-between">
          {step > 1 && (
            <TouchableOpacity
              className="bg-gray-400 px-6 py-3 rounded-lg"
              onPress={handleBack}
            >
              <Text className="text-white">Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className="bg-blue-600 px-6 py-3 rounded-lg ml-auto"
            onPress={step === 4 ? handleSubmit : handleNext}
          >
            <Text className="text-white">{step === 4 ? "Submit" : "Next"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
