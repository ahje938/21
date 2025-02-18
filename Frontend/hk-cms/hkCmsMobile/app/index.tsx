import { useEffect } from "react";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import DoodlesBackgroundOrange from "../components/doodlesbackgroundOrange"; 

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/login");
    }, 3000);
  }, []);

  return (
    <DoodlesBackgroundOrange>
    
      <Image source={require("../assets/images/Vaerkritisk.png")} style={styles.logo} />

      
      <Text style={styles.text}>Et samarbeidsprosjekt mellom</Text>

      
      <View style={styles.rowContainer}>
        <Image source={require("../assets/images/Kristiania.png")} style={styles.smallLogo} />
        <Image source={require("../assets/images/Oslomet.png")} style={styles.smallLogo} />
      </View>

      
    </DoodlesBackgroundOrange>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,  
    height: 250, 
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  smallLogo: {
    width: 80,  
    height: 80,  
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  loader: {
    marginTop: 20,
  },
});
