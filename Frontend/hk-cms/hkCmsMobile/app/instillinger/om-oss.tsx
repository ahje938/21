import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function AboutPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Om Oss</Text>
      <Text>Her er informasjon om oss...</Text>

      <Button title="Tilbake" onPress={() => router.back()} />
    </View>
  );
}