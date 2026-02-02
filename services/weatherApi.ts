import { API_CONFIG } from "../constants/config";
import { ForecastData, WeatherData } from "../types/weather";

export const citys = ["Stockholm", "London", "Paris", "Berlin", "Amsterdam"];

const buildUrl = (endpoint: string, city: string) => {
  return `${API_CONFIG.BASE_URL}/${endpoint}?q=${city}&appid=${API_CONFIG.API_KEY}&units=metric`;
};

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(buildUrl("weather", city));

    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);

    const data: WeatherData = await response.json();

    return data;
  } catch (error) {
    console.log(`Error fetching weather for ${city}:`, error);
    throw error;
  }
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await fetch(buildUrl("forecast", city));
    if (!response.ok) throw new Error(`Forecast API error: ${response.status}`);

    const data: ForecastData = await response.json();

    return data;
  } catch (error) {
    console.log(`Error fetching forecast for ${city}:`, error);
    throw error;
  }
};
