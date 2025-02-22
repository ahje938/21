import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons"; // Import for eye icon

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [progress, setProgress] = useState<number>(60); // Simulate progress (in percentage)
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleRegister = () => {
    if (email && username && password) {
      //Alert.alert("Registration Successful", "You can now log in.");
      //router.replace("/(tabs)");
      router.push("/registrering/velg-avatar");
    } else {
      Alert.alert("Registration Failed", "Please fill in all fields.");
    }
  };

  const handleCancel = () => {
    router.push("/login"); // Navigate back to login screen
  };

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Lag en bruker</Text>

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

        <Text style={styles.label}>E-post</Text>
        <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder=""
            style={styles.inputField}
        />

        <Text style={styles.label}>Brukernavn</Text>
        <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder=""
            style={styles.inputField}
        />

        <Text style={styles.label}>Passord</Text>
        <View style={styles.inputContainer}>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
                placeholder=""
                style={styles.inputField}
            />
            <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={styles.eyeIcon}
            >
            <Feather name={secureTextEntry ? "eye-off" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>



        <View style={styles.buttonRow}>
            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Avbryt</Text>
            </TouchableOpacity>

            {/* Neste Button */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Neste</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  inputField: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 12,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFB703",
    paddingVertical: 12,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%", // Ensures both inputs have full width
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  eyeIcon: {
    position: "absolute", // Absolutely position the icon inside the input field
    right: 10, // Move it to the right
    padding: 10,
  },
});