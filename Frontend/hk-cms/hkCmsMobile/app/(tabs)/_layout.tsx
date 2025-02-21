import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{headerShown: false, title: "Moduler" }} />
      <Tabs.Screen name="profile" options={{headerShown: false, title: "Profile" }} />
      <Tabs.Screen name="ledertavle" options={{headerShown: false, title: "Ledertavle" }} />
      <Tabs.Screen name="instillinger" options={{headerShown: false, title: "Innstillinger" }} />
    </Tabs>
  );
}

