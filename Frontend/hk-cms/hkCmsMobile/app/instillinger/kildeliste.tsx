import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function KildelistePage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Kildeliste</Text>
      <Text>Her er en liste over kilder...</Text>
      <Button title="Tilbake" onPress={() => router.back()} />
    </View>
  );
}
