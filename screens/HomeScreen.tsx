import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";

import { getCurrentWeather } from "../services/weatherApi";
import { WeatherData } from "../types/weather";

export const HomeScreen = ({
  onCityPress,
}: {
  onCityPress: (city: string) => void;
}) => {
  const citys = ["Stockholm", "London", "Paris", "Berlin", "Amsterdam"];
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllWeather();
  }, []);

  const fetchAllWeather = async () => {
    try {
      const result: WeatherData[] = [];

      for (const city of citys) {
        const data = await getCurrentWeather(city);
        result.push(data);
      }

      setWeatherList(result);
    } catch (error) {
      console.log("Failed to fetch weather:", error);
      setError("Something went wrong, please wait ...");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cities</Text>

      {error ? (
        <Text>{error}</Text>
      ) : weatherList.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={weatherList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => onCityPress(item.name)}
            >
              <Text style={styles.cityName}>{item.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                  }}
                  style={styles.icon}
                />
                <Text style={styles.temp}>{item.main.temp}°C</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  cityName: {
    fontSize: 18,
  },
  icon: {
    width: 40,
    height: 40,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
