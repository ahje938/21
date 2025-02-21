import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import DoodlesBackgroundBlue from "../components/doodlesbackgroundBlue";
import { Feather } from "@expo/vector-icons"; // Import for eye icon

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Login Failed", "Invalid username or password");
    }
  };

  return (
    <DoodlesBackgroundBlue>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("@/assets/images/iti.png")} // Update path to actual logo
          style={styles.logo}
        />

        <Text style={styles.title}>Logg inn</Text>

        {/* Username Field */}
        <Text style={styles.label}>Brukernavn</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder=""
            value={username}
            onChangeText={setUsername}
            style={styles.inputField}
          />
        </View>

        {/* Password Field */}
        <Text style={styles.label}>Passord</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            style={styles.inputField}
          />
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            style={styles.eyeIcon}
          >
            <Feather name={secureTextEntry ? "eye-off" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Glemt passord?</Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleLogin}>
          <Text style={styles.nextButtonText}>Neste</Text>
        </TouchableOpacity>

        {/* Separator Line */}
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}>Eller</Text>
          <View style={styles.separator} />
        </View>

        {/* Feide & Guest Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Feide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Gjest</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <TouchableOpacity onPress={() => router.push("/registrering/lag-bruker")}>
          <Text style={styles.registerText}>
            Har du ikke bruker?{" "}
            <Text style={styles.registerLink}>Registrer deg her</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </DoodlesBackgroundBlue>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 80, // Adjust based on actual logo size
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  inputContainer: {
    width: "100%", // Ensures both inputs have full width
    borderWidth: 1,
    borderColor: "#B7B7B7",
    borderRadius: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: "flex-start",
    color: "#007BFF",
    fontSize: 14,
    marginBottom: 20,
  },
  nextButton: {
    width: "100%",
    maxWidth: 300,

    backgroundColor: "#FFB703", // Yellow color from the image
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#B7B7B7",
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#666",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#B7B7B7",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

