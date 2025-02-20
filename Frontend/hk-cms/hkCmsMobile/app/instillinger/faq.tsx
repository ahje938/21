import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function FAQPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>FAQ</Text>
      <Text>Vanlige spørsmål og svar...</Text>
      <Button title="Tilbake" onPress={() => router.back()} />
    </View>
  );
}
