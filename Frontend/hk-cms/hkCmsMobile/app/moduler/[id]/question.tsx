import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function QuestionPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Dummy Question for Module {id}
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 20 }}>Hva er hovedingrediensen i C-Vitamin?</Text>

      <TouchableOpacity
        onPress={() => router.push(`/moduler/${id}/game-done`)}
        style={{ backgroundColor: "#4CAF50", padding: 15, borderRadius: 8, marginBottom: 10 }}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Svar: Askorbinsyre</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push(`/moduler/${id}/game-done`)}
        style={{ backgroundColor: "#f44336", padding: 15, borderRadius: 8 }}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Svar: Jern</Text>
      </TouchableOpacity>
    </View>
  );
}
