import { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { getCurrentWeather, getForecast } from "../services/weatherApi";
import { WeatherData, ForecastData, ForecastItem } from "../types/weather";

export const DetailScreen = ({
  city,
  onBack,
}: {
  city: string;
  onBack: () => void;
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const weatherData = await getCurrentWeather(city);
      const forecastData = await getForecast(city);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.log("Failed to fetch details:", error);
      setError("Something went wrong, please wait ...");
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={onBack}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!weather || !forecast) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  const todayForecast: ForecastItem[] = [];
  const tomorrowForecast: ForecastItem[] = [];

  for (const item of forecast.list) {
    if (item.dt_txt.includes(today)) {
      todayForecast.push(item);
    }

    if (item.dt_txt.includes(tomorrow)) {
      tomorrowForecast.push(item);
    }
  }

  const showForecast = (list: ForecastItem[], title: string) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>

      {list.map((item) => (
        <View key={item.dt} style={styles.forecastRow}>
          <Text style={styles.forecastTime}>
            {item.dt_txt.split(" ")[1].slice(0, 5)}
          </Text>
          <View>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              }}
              style={styles.icon}
            />
            <Text style={styles.forecastTemp}>{item.main.temp}°C</Text>
          </View>
        </View>
      ))}
    </>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text style={styles.info}>Wind: {weather.wind.speed} m/s</Text>
      <Text style={styles.info}>Humidity: {weather.main.humidity}%</Text>

      {showForecast(todayForecast, "Today")}
      {showForecast(tomorrowForecast, "Tomorrow")}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  back: {
    fontSize: 16,
    color: "blue",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 24,
    marginVertical: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },
  forecastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#eee",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forecastTime: {
    fontSize: 16,
    width: 50,
  },
  icon: {
    width: 40,
    height: 40,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
