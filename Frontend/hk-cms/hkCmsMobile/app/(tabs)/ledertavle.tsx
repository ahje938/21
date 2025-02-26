import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icons

// Sample leaderboard data (to be replaced with CMS data later)
const players = [
  { id: "1", name: "Player 1", rank: 1 },
  { id: "2", name: "Player 2", rank: 2 },
  { id: "3", name: "Player 3", rank: 3 },
  { id: "4", name: "Player 4", rank: 4 },
  { id: "5", name: "Player 5", rank: 5 },
  { id: "6", name: "Player 6", rank: 6 },
];

const Ledertavle = () => {
  const [activeFilter, setActiveFilter] = useState("Weekly");

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Ledertavle</Text>
        <Text style={styles.logo}>iti</Text>
      </View>

      {/* Switch Buttons */}
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, activeFilter === "Weekly" && styles.activeButton]}
          onPress={() => setActiveFilter("Weekly")}
        >
          <Text style={styles.buttonText}>Ukentlig</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, activeFilter === "Region" && styles.activeButton]}
          onPress={() => setActiveFilter("Region")}
        >
          <Text style={styles.buttonText}>Region</Text>
        </TouchableOpacity>
      </View>

      {/* Podium Section */}
      <View style={styles.podium}>
        <View style={[styles.podiumBlock, styles.second]}>
          <Text style={styles.podiumText}>2</Text>
        </View>
        <View style={[styles.podiumBlock, styles.first]}>
          <Text style={styles.podiumText}>1</Text>
        </View>
        <View style={[styles.podiumBlock, styles.third]}>
          <Text style={styles.podiumText}>3</Text>
        </View>
      </View>

      {/* Player List */}
      <FlatList
        data={players.slice(3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.rank}</Text>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 40 },
  title: { fontSize: 20, fontWeight: "bold" },
  logo: { fontSize: 22, fontWeight: "bold", color: "#ff6600" },
  switchContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 15 },
  switchButton: { padding: 10, backgroundColor: "#ddd", borderRadius: 10, marginHorizontal: 5 },
  activeButton: { backgroundColor: "#ffcc00" },
  buttonText: { fontSize: 14, fontWeight: "bold" },
  podium: { flexDirection: "row", justifyContent: "center", alignItems: "flex-end", height: 150 },
  podiumBlock: { width: 60, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 5 },
  first: { backgroundColor: "#ffcc00", height: 80 },
  second: { backgroundColor: "#6699ff", height: 60 },
  third: { backgroundColor: "#ff9966", height: 50 },
  podiumText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  listItem: { flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#fff", marginVertical: 5, borderRadius: 5 },
});

export default Ledertavle;
