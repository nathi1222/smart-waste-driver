export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: string;
  alerts: WeatherAlert[];
}

export interface WeatherAlert {
  type: 'rain' | 'storm' | 'snow' | 'heat' | 'wind';
  severity: 'low' | 'moderate' | 'severe';
  message: string;
}

class WeatherService {
  private static instance: WeatherService;
  private apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with actual API key

  static getInstance() {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  async getWeatherForLocation(lat: number, lon: number): Promise<WeatherData> {
    // In production, use actual API call
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
    // return await response.json();
    
    // Mock data for demonstration
    return {
      temperature: 22,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      precipitation: 10,
      icon: '☁️',
      alerts: []
    };
  }

  async getWeatherForRoute(route: { lat: number; lng: number }[]): Promise<Map<string, WeatherData>> {
    const weatherMap = new Map();
    for (const point of route) {
      const weather = await this.getWeatherForLocation(point.lat, point.lng);
      weatherMap.set(`${point.lat},${point.lng}`, weather);
    }
    return weatherMap;
  }

  getCollectionDifficulty(weather: WeatherData): 'easy' | 'moderate' | 'hard' {
    if (weather.precipitation > 70 || weather.windSpeed > 30) return 'hard';
    if (weather.precipitation > 30 || weather.windSpeed > 15) return 'moderate';
    return 'easy';
  }

  getWeatherAdvice(weather: WeatherData): string {
    if (weather.precipitation > 70) return '⚠️ Heavy rain expected. Take extra caution while driving.';
    if (weather.windSpeed > 25) return '💨 Strong winds. Secure loose items in truck.';
    if (weather.temperature > 35) return '🥤 Extreme heat. Stay hydrated and take breaks.';
    if (weather.temperature < 0) return '❄️ Freezing conditions. Watch for ice on roads.';
    if (weather.precipitation > 20) return '☔ Light rain. Use caution when stopping.';
    return '✅ Weather conditions are favorable for collection.';
  }
}

export default WeatherService.getInstance();