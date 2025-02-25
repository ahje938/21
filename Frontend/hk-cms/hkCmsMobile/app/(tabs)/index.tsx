import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons"; // For stjerner og lås-ikon

const initialModules = [
  {
    id: "1",
    title: "Hjelper C-vitamin mot forkjølelse?",
    image: require("../../assets/images/sun.png"), // Bytt ut med API-sti
    stars: 4,
    points: 5000,
    locked: false,
  },
  {
    id: "2",
    title: "Er global oppvarming ekte?",
    image: require("../../assets/images/temperature.png"),
    stars: 0,
    points: 5000,
    locked: true,
  },
  {
    id: "3",
    title: "Hvem tjener på dine valg av kosttilskudd?",
    image: require("../../assets/images/earth.png"),
    stars: 0,
    points: 5000,
    locked: true,
  },
  {
    id: "4",
    title: "Kosmetiske operasjoner leder til dårligere selvbilde?",
    image: require("../../assets/images/flower.png"),
    stars: 0,
    points: 5000,
    locked: true,
  },
];

export default function MainPage() {
  const router = useRouter();
  const [modules, setModules] = useState(initialModules);

  // Funksjon for å åpne en modul
  const handlePress = (module: any) => {
    if (!module.locked) {
      router.push(`/moduler/${module.id}`);
    }
  };

  // Funksjon for å vise stjerner
  const renderStars = (stars: number) => {
    const totalStars = 5;
    return [...Array(totalStars)].map((_, index) => (
      <FontAwesome
        key={index}
        name={index < stars ? "star" : "star-o"}
        size={20}
        color={index < stars ? "#f1c40f" : "gray"}
        style={{ marginHorizontal: 2 }}
      />
    ));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: "30%", alignSelf: "center", marginBottom: "5%" }}>
        Moduler
      </Text>

      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} // Fjerner scrollbar
        contentContainerStyle={{ paddingBottom: 100 }} // Hindrer at siste element blir kuttet
        renderItem={({ item }) => (
          <TouchableOpacity
/*             onPress={() => {
              if (!item.locked) router.push(`/moduler/${item.id}`);

            }} */
            onPress={() => handlePress(item)}
            style={{
              backgroundColor: item.locked ? "#E4E5E5" : "#E3EEFC",
              padding: 20,
              marginVertical: 10,
              borderRadius: 20,
              flexDirection: "row",
              alignSelf: "center",
              height: 170,
              width: "95%"
            }}
          >
            <Image
              source={item.image}
              style={{ width: 110, height: 110, marginRight: 15, alignSelf: "center" }}
              resizeMode="contain"
            />
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.title}
              </Text>
              <View style={{ flexDirection: "row", marginVertical: 5 }}>
                {renderStars(item.stars)}
              </View>
              <Text style={{ marginLeft: 5 }}>
                {item.points}p
              </Text>
            </View>

{/*             <Text style={{ fontSize: 18, color: item.locked ? "white" : "black" }}>
              {item.title}
            </Text> */}
            <Text style={{ fontSize: 18, alignSelf: "flex-end", color: item.locked ? "white" : "black" }}>
              {item.locked ? (
                <FontAwesome name="lock" size={20} color="gray" />
              ) : (
                <FontAwesome name="arrow-right" size={20} color="#2d3b55" />
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}