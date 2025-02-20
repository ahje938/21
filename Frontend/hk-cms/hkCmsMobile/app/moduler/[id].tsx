import { View, Text, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ModulePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Module {id}</Text>
      <Text style={{ marginVertical: 10 }}>Her er informasjon om modul {id}...</Text>

      <Button title="Start Spillet" onPress={() => router.push(`/moduler/${id}/question`)} />
      <Button title="Tilbake til moduler" onPress={() => router.back()} />
    </View>
  );
}
