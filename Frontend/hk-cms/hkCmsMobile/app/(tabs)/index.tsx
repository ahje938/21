import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";

const modules = [
  { id: "1", title: "Hjelper C-Vitamin mot forkjølelse?", locked: false },
  { id: "2", title: "Modul 2 (Locked)", locked: true },
  { id: "3", title: "Modul 3 (Locked)", locked: true },
];

export default function MainPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Moduler</Text>

      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (!item.locked) router.push(`/moduler/${item.id}`);

            }}
            style={{
              backgroundColor: item.locked ? "gray" : "#f1c40f",
              padding: 20,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: item.locked ? "white" : "black" }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

 
    </View>
  );
}
