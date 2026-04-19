import React, { useState, useEffect } from 'react';
import { CloudIcon, ExclamationTriangleIcon, ArrowPathIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: string;
  feelsLike: number;
  uvIndex: number;
}

interface WeatherWidgetProps {
  lat: number;
  lon: number;
  onWeatherAlert?: (alert: string) => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ lat, lon, onWeatherAlert }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [collectionDifficulty, setCollectionDifficulty] = useState<'easy' | 'moderate' | 'hard'>('easy');

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 1800000);
    return () => clearInterval(interval);
  }, [lat, lon]);

  const fetchWeather = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockWeather: WeatherData = {
        temperature: 22,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        precipitation: 10,
        icon: '☁️',
        feelsLike: 21,
        uvIndex: 5,
      };
      setWeather(mockWeather);
      
      let difficulty: 'easy' | 'moderate' | 'hard' = 'easy';
      if (mockWeather.precipitation > 70 || mockWeather.windSpeed > 30) {
        difficulty = 'hard';
        onWeatherAlert?.('⚠️ Severe weather may affect collection');
      } else if (mockWeather.precipitation > 30 || mockWeather.windSpeed > 15) {
        difficulty = 'moderate';
        onWeatherAlert?.('⚠️ Moderate weather conditions');
      }
      setCollectionDifficulty(difficulty);
      setLoading(false);
    }, 500);
  };

  const getWeatherAdvice = () => {
    if (!weather) return '';
    if (weather.precipitation > 70) return 'Heavy rain expected. Take extra caution.';
    if (weather.windSpeed > 25) return 'Strong winds. Secure loose items.';
    if (weather.temperature > 35) return 'Extreme heat. Stay hydrated.';
    if (weather.temperature < 0) return 'Freezing conditions. Watch for ice.';
    if (weather.precipitation > 20) return 'Light rain. Use caution when stopping.';
    return 'Weather conditions are favorable.';
  };

  const getDifficultyColor = () => {
    switch (collectionDifficulty) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-amber-600 bg-amber-50';
      case 'hard': return 'text-red-600 bg-red-50';
    }
  };

  const getDifficultyText = () => {
    switch (collectionDifficulty) {
      case 'easy': return '✅ Easy Collection';
      case 'moderate': return '⚠️ Moderate Difficulty';
      case 'hard': return '🔴 Hard Collection';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="animate-pulse flex gap-3">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CloudIcon className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Weather & Route Conditions</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor()}`}>
          {getDifficultyText()}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-5xl">{weather?.icon}</span>
          <div>
            <div className="text-2xl font-bold text-gray-800">{weather?.temperature}°C</div>
            <div className="text-sm text-gray-600">Feels like {weather?.feelsLike}°C</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-800">{weather?.condition}</div>
          <div className="text-xs text-gray-500">UV Index: {weather?.uvIndex}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-600">
            <CloudIcon className="h-4 w-4" />
            <span className="text-xs">Rain</span>
          </div>
          <div className="text-sm font-semibold">{weather?.precipitation}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-600">
            <ArrowPathIcon className="h-4 w-4" />
            <span className="text-xs">Wind</span>
          </div>
          <div className="text-sm font-semibold">{weather?.windSpeed} km/h</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-600">
            <ClipboardDocumentIcon className="h-4 w-4" />
            <span className="text-xs">Humidity</span>
          </div>
          <div className="text-sm font-semibold">{weather?.humidity}%</div>
        </div>
      </div>

      <div className="bg-white/50 rounded-lg p-2 flex items-start gap-2">
        <ExclamationTriangleIcon className="h-4 w-4 text-amber-500 mt-0.5" />
        <p className="text-xs text-gray-700">{getWeatherAdvice()}</p>
      </div>

      <div className="mt-3 pt-3 border-t border-blue-100">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Collection Difficulty Prediction:</span>
          <div className="flex gap-1">
            {['easy', 'moderate', 'hard'].map((level) => (
              <div
                key={level}
                className={`w-8 h-1 rounded-full ${
                  collectionDifficulty === level 
                    ? level === 'easy' ? 'bg-green-500' : level === 'moderate' ? 'bg-amber-500' : 'bg-red-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;