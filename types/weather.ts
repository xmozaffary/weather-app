export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

export interface ForecastData {
  city: {
    name: string;
  };
  list: ForecastItem[];
}
