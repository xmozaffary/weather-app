import { useState } from "react";
import { View } from "react-native";

import { HomeScreen } from "./screens/HomeScreen";
import { DetailScreen } from "./screens/DetailScreen";

export default function App() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {selectedCity === null ? (
        <HomeScreen onCityPress={(city) => setSelectedCity(city)} />
      ) : (
        <DetailScreen
          city={selectedCity}
          onBack={() => setSelectedCity(null)}
        />
      )}
    </View>
  );
}
