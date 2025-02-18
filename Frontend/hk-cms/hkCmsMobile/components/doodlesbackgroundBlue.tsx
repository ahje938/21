import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

export default function DoodlesBackgroundBlue({ children }) {
  return (
    <ImageBackground
      source={require("../assets/images/Doodles2.png")} // Change path to actual blue background
      style={styles.background}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
