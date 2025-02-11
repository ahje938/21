import { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/login"); 
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Main Image */}
      <Image source={require("../assets/images/Vaerkritisk.png")} style={styles.logo} />

      {/* Text */}
      <Text>Et samarbeidsprosjekt mellom</Text>

      {/* Container for side-by-side images */}
      <View style={styles.rowContainer}>
        <Image source={require("../assets/images/Kristiania.png")} style={styles.smallLogo} />
        <Image source={require("../assets/images/Oslomet.png")} style={styles.smallLogo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 250,  
    height: 250, 
    resizeMode: "contain",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row", // Aligns items horizontally
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  smallLogo: {
    width: 100,  // Adjust size as needed
    height: 100, // Adjust size as needed
    resizeMode: "contain",
    marginHorizontal: 10, // Space between images
  },
});
