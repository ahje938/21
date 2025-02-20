import { View, Image, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";



export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    // Ask for permission to access photos
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You need to allow access to your photos!");
      return;
    }

    // Open the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square image
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", marginTop: 50 }}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profileImage ? { uri: profileImage } : require("../../assets/images/default-avatar.png")}
          style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 18 }}>Tap to change profile picture</Text>
    </View>
  );
}
