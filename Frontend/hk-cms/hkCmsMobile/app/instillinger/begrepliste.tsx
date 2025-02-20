import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function BegreplistePage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Begrepliste</Text>
      <Text>Her finner du en oversikt over begreper...</Text>
      <Button title="Tilbake" onPress={() => router.back()} />
    </View>
  );
}
