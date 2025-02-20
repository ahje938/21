import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Personvern</Text>
      <Text>Informasjon om personvern...</Text>
      <Button title="Tilbake" onPress={() => router.back()} />
    </View>
  );
}
