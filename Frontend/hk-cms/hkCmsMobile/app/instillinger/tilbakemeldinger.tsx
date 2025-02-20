import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function FeedbackPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Tilbakemeldinger</Text>
      <Text>Send oss dine tilbakemeldinger...</Text>
      <Button title="Tilbake" onPress={() => router.back()} />
    </View>
  );
}
