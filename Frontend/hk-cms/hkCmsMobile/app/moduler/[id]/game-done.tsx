import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function GameDonePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
        🎉 Gratulerer med gjennomført modul!
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 20 }}>Du har blitt tildelt oppnåelsen:</Text>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#4CAF50", marginBottom: 20 }}>
        C-Vitamin!
      </Text>

      <TouchableOpacity
  onPress={() => router.push(`/moduler/${id}/more-info`)}
  style={{ backgroundColor: "#4CAF50", padding: 15, borderRadius: 8, marginBottom: 10 }}
>
  <Text style={{ fontSize: 18, color: "white" }}>Få mer informasjon om modulen</Text>
</TouchableOpacity>


      <TouchableOpacity
        onPress={() => router.push("/(tabs)")}
        style={{ backgroundColor: "#FFA500", padding: 15, borderRadius: 8 }}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Tilbake til hjemmesiden</Text>
      </TouchableOpacity>
    </View>
  );
}
