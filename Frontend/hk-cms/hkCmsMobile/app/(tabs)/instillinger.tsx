import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function InstillingerScreen() {
  const router = useRouter();

  const menuItems = [
    { title: "Om oss", route: "/instillinger/om-oss" },
    { title: "Personvern", route: "/instillinger/personvern" },
    { title: "Kildeliste", route: "/instillinger/kildeliste" },
    { title: "Begrepliste", route: "/instillinger/begrepliste" },
    { title: "FAQ", route: "/instillinger/faq" },
    { title: "Tilbakemeldinger", route: "/instillinger/tilbakemeldinger" },
  ];

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Innstillinger
      </Text>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => router.push(item.route)}
          style={{
            backgroundColor: "#f1f1f1",
            padding: 15,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{
          backgroundColor: "red",
          padding: 15,
          marginTop: 20,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Logg ut</Text>
      </TouchableOpacity>
    </View>
  );
}
