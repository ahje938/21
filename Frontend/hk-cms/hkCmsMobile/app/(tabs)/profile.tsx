import React, { useState, useRef } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Animated, PanResponder, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get('window').width;

// Define proper TypeScript interfaces for our data structures
interface Achievement {
  id: number;
  icon: string;
  type: string;
}

interface Progress {
  icon: string;
  message: string;
  buttonText: string;
}

interface AchievementCard {
  id: number;
  title: string;
  type: "achievements" | "progress";
  achievements?: Achievement[];
  progress?: Progress;
}

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const position = useRef(new Animated.Value(0)).current;
  
  // Define achievement cards data with proper typing
  const achievementCards: AchievementCard[] = [
    {
      id: 1,
      title: "Oppnåelser",
      type: "achievements",
      achievements: [
        { id: 1, icon: "💪", type: "exercise" },
        { id: 2, icon: "🥗", type: "nutrition" }
      ]
    },
    {
      id: 2,
      title: "Fortsett - C-vitamin mot forkjølelse",
      type: "progress",
      progress: { 
        icon: "☀️", 
        message: "Du har 2 spørsmål igjen å fullføre",
        buttonText: "Fortsett"
      }
    }
  ];

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 50 && activeIndex > 0) {
          // Swipe right, go to previous
          slideRight();
        } else if (gesture.dx < -50 && activeIndex < achievementCards.length - 1) {
          // Swipe left, go to next
          slideLeft();
        } else {
          // Return to current position
          Animated.spring(position, {
            toValue: 0,
            friction: 4,
            useNativeDriver: true
          }).start();
        }
      }
    })
  ).current;

  const slideLeft = () => {
    Animated.timing(position, {
      toValue: -SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      setActiveIndex(activeIndex + 1);
      position.setValue(0);
    });
  };

  const slideRight = () => {
    Animated.timing(position, {
      toValue: SCREEN_WIDTH,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      setActiveIndex(activeIndex - 1);
      position.setValue(0);
    });
  };

  const renderAchievementCard = () => {
    const currentCard = achievementCards[activeIndex];
    
    if (currentCard.type === "achievements" && currentCard.achievements) {
      // First card - Achievements
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{currentCard.title}</Text>
          <View style={styles.achievementsContainer}>
            {currentCard.achievements.map(item => (
              <View key={item.id} style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>{item.icon}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    } else if (currentCard.type === "progress" && currentCard.progress) {
      // Second card - Continue learning
      const { icon, message, buttonText } = currentCard.progress;
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{currentCard.title}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.circleContainer}>
              <Text style={styles.circleIcon}>{icon}</Text>
            </View>
            <Text style={styles.progressText}>{message}</Text>
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continueButtonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header with back button and logo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Image 
          source={require("../../assets/images/iti-transparent.png")} 
          style={styles.logo}
          // Replace with your actual logo
        />
      </View>
      
      {/* Profile section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : require("../../assets/images/default-avatar.png")}
            style={styles.profileImage}
          />
          <View style={styles.editIconContainer}>
            <Ionicons name="pencil" size={16} color="#333" />
          </View>
        </TouchableOpacity>
        <Text style={styles.username}>Astrid Nordmann</Text>
        
        {/* Stats section */}
        <View style={styles.statsContainer}>
          <View style={[styles.statBox, styles.greenStat]}>
            <Text style={styles.statLabel}>Poeng</Text>
            <View style={styles.statValueContainer}>
              <Ionicons name="trophy-outline" size={18} color="#333" />
              <Text style={styles.statValue}>3245</Text>
            </View>
          </View>
          <View style={[styles.statBox, styles.pinkStat]}>
            <Text style={styles.statLabel}>Gjennomførte spill</Text>
            <View style={styles.statValueContainer}>
              <Ionicons name="game-controller-outline" size={18} color="#333" />
              <Text style={styles.statValue}>1</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Separator with pagination dots */}
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <View style={styles.paginationDots}>
          <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
          <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
        </View>
      </View>
      
      {/* Swipeable Achievement Cards */}
      <Animated.View 
        style={[
          styles.cardContainer,
          { transform: [{ translateX: position }] }
        ]} 
        {...panResponder.panHandlers}
      >
        {renderAchievementCard()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0ff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#eaeaff",
  },
  backButton: {
    padding: 5,
  },
  logo: {
    width: 50,
    height: 20,
    resizeMode: "contain",
  },
  profileSection: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: "#eaeaff",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ff8a80",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ffca28",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  statBox: {
    borderRadius: 10,
    padding: 12,
    width: "48%",
  },
  greenStat: {
    backgroundColor: "#c8e6c9",
  },
  pinkStat: {
    backgroundColor: "#ffab91",
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  statValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  separatorContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#333",
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 180,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  achievementsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  achievementItem: {
    width: 50,
    height: 50,
    backgroundColor: "#fff3e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ffe0b2",
  },
  achievementIcon: {
    fontSize: 24,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  circleContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff3e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ffe0b2",
  },
  circleIcon: {
    fontSize: 30,
  },
  progressText: {
    textAlign: "center",
    marginBottom: 15,
  },
  continueButton: {
    backgroundColor: "#ffca28",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  continueButtonText: {
    fontWeight: "bold",
  },
});