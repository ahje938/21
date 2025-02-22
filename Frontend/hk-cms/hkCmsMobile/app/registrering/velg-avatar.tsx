import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons"; // Ikoner for avatarer
import { FlatList } from "react-native";

export default function AvatarSelectionScreen() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(70); // Simulate progress (in percentage)

  // Eksempelikoner
  const avatars = [
    { id: "1", icon: "x-circle", color: "#FF6B6B" },
    { id: "2", icon: "droplet", color: "#6A98F0" },
    { id: "3", icon: "car", color: "#A8E760" },
    { id: "4", icon: "coffee", color: "#5A9FD4" },
    { id: "5", icon: "smile", color: "#F4A261" },
    { id: "6", icon: "piggy-bank", color: "#E69F9F" },
    { id: "7", icon: "heart", color: "#8D6E63" },
    { id: "8", icon: "calendar", color: "#50D890" },
    { id: "9", icon: "lightbulb", color: "#FCD34D" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velg en avatar</Text>
      
        {/* Progress Bar Section */}
        <View style={styles.progressContainer}>
            <View
            style={[styles.progressBarBackground, { width: `${40}%`, height: `${200}%` }]} // Light blue background
            >
            <View
                style={[
                styles.progressBarFill,
                { width: `${progress}%` }, // Dark blue progress bar width
                ]}
            />
            </View>
        </View>

      {/* Avatar Grid */}

{/*         <FlatList
            data={avatars}
            keyExtractor={(item) => item.id}
            numColumns={3} // Ensures a proper grid
            columnWrapperStyle={{ justifyContent: "center" }} // Centers avatars in the row
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                        styles.avatarButton,
                        { backgroundColor: item.color },
                        selectedAvatar === item.id && styles.selectedAvatar,
                    ]}
                    onPress={() => setSelectedAvatar(item.id)}
                    >
                <Feather name={item.icon as any} size={40} color="#2C3E50" />
                </TouchableOpacity>
            )}
        /> */}


      <View style={styles.avatarGrid}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatarButton,
              { backgroundColor: avatar.color },
              selectedAvatar === avatar.id && styles.selectedAvatar,
            ]}
            onPress={() => setSelectedAvatar(avatar.id)}
          >
            <Feather name={avatar.icon as any} size={40} color="#2C3E50" />
          </TouchableOpacity>
        ))}
      </View>


      {/* Neste-knapp */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/registrering/ledertavle-anonym")}
        disabled={!selectedAvatar} // Deaktiver knappen hvis ingen avatar er valgt
      >
        <Text style={styles.buttonText}>Neste</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2C3E50",
  },
  progressContainer: {
    width: "100%",
    height: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  progressBarBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ADD8E6", // Light blue background
    borderRadius: 5,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#003366", // Dark blue fill
    borderRadius: 5,
  },
  avatarGrid: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#E3EEFC",
    borderRadius: 23,
    height: "40%",
    padding: "9%", // Adds spacing inside the grid
  },
  avatarButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedAvatar: {
    borderWidth: 4,
    borderColor: "#2C3E50",
  },
  button: {
    backgroundColor: "#FFB703",
    paddingVertical: 12,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }
});