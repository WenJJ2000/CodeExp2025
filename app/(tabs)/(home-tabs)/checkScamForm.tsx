import {
  ActivityIndicator,
  Alert,
  Animated,
  GestureResponderEvent,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Option,
} from '~/components/ui/select';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CheckScamForm {
  selectedImageUri: string | null;
  setSelectedImageUri: Dispatch<SetStateAction<string | null>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  pickImageForImage: (event: GestureResponderEvent) => void;
  pickImageForText: (event: GestureResponderEvent) => void;
}

export default function CheckScamForm(props: CheckScamForm) {
  const colorScheme = useColorScheme();

  const pickImageForImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      props.setSelectedImageUri(result.assets[0].uri); // Just set the uri
    }
  };

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 20,
    right: 20,
  };

  function handleUpdateDescription(
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    props.setDescription(e.nativeEvent.text);
    console.log(props.description);
  }
  function handleSelectChange(option: Option) {
    if (option) {
      props.setType(option.value);
      console.log(props.type);
    }
  }

  return (
    <View
      className={`border rounded-2xl p-4 mb-2${
        colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
      }`}
    >
      <View className="pb-5">
        (
        <Label className="pb-1">
          <Text>Scam Type</Text>
        </Label>
        <Select
          defaultValue={{ value: 'null', label: 'Select a Type' }}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-300">
            <SelectValue
              className="text-foreground text-sm native:text-lg"
              placeholder="Select a type"
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className="w-[300px]">
            <SelectGroup>
              <SelectItem label="Email " value="email">
                <Text>Email</Text>
              </SelectItem>
              <SelectItem label="SMS" value="sms">
                <Text>SMS</Text>
              </SelectItem>
              <SelectItem label="Phone" value="phone">
                <Text>Phone</Text>
              </SelectItem>
              <SelectItem label="Social" value="social">
                <Text>Social</Text>
              </SelectItem>
              <SelectItem label="Website" value="website">
                <Text>Website</Text>
              </SelectItem>
              <SelectItem label="In Person" value="inPerson">
                <Text>In Person</Text>
              </SelectItem>
              <SelectItem label="App" value="app">
                <Text>App</Text>
              </SelectItem>
              <SelectItem label="Crypto" value="crypto">
                <Text>Crypto</Text>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        );
      </View>
      <View className="pb-5">
        <Label className="pb-1">
          <Text>Description</Text>
        </Label>
        <Textarea onChange={handleUpdateDescription} />
        {/* </Input> */}
      </View>
      <Pressable
        onPress={
          props.type == 'email' ||
          props.type == 'sms' ||
          props.type == 'social' ||
          props.type == 'website'
            ? props.pickImageForText
            : props.pickImageForImage
        }
      >
        <View
          className={`justify-center items-center h-36 rounded-xl mb-2 ${
            colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
          } border`}
        >
          <Text className="text-3xl mb-2">⬆️</Text>
          <Text
            className={`text-center ${
              colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Upload an image
          </Text>
        </View>
      </Pressable>

      {/* Image preview shown below the buttons */}
      {props.selectedImageUri && (
        <View style={{ marginTop: 24, alignItems: 'center' }}>
          <Text
            className={`mb-2 text-center ${
              colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Preview
          </Text>
          <Image
            source={{ uri: props.selectedImageUri }}
            style={{
              width: 330,
              height: 220,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colorScheme === 'dark' ? '#444' : '#ccc',
            }}
            resizeMode="contain"
          />
          <Pressable
            onPress={() => props.setSelectedImageUri(null)}
            style={{ marginTop: 8 }}
          >
            <Text style={{ color: 'red' }}>Remove image</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
