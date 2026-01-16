import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/client';
import type { WeatherApiResponse } from '../types';

const getWeatherIcon = (iconCode: string): string => {
  const iconMap: { [key: string]: string } = {
    '01d': 'fa-sun',
    '01n': 'fa-moon',
    '02d': 'fa-cloud-sun',
    '02n': 'fa-cloud-moon',
    '03d': 'fa-cloud',
    '03n': 'fa-cloud',
    '04d': 'fa-cloud',
    '04n': 'fa-cloud',
    '09d': 'fa-cloud-showers-heavy',
    '09n': 'fa-cloud-showers-heavy',
    '10d': 'fa-cloud-sun-rain',
    '10n': 'fa-cloud-moon-rain',
    '11d': 'fa-cloud-bolt',
    '11n': 'fa-cloud-bolt',
    '13d': 'fa-snowflake',
    '13n': 'fa-snowflake',
    '50d': 'fa-smog',
    '50n': 'fa-smog',
  };
  return iconMap[iconCode] || 'fa-question-circle';
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData();
        setWeather(data);
      } catch (err) {
        setError('Dati meteo non disponibili.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center min-h-[140px]">
        <div className="flex items-center gap-4">
          <i className="fas fa-spinner fa-spin text-3xl text-emerald-500"></i>
          <p className="text-gray-600 dark:text-gray-400">Caricamento meteo...</p>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
       <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center min-h-[140px]">
         <div className="flex items-center gap-4 text-red-400">
           <i className="fas fa-exclamation-triangle text-3xl"></i>
           <p>{error || 'Impossibile caricare i dati.'}</p>
         </div>
       </div>
    );
  }

  const { name, main, weather: weatherDetails } = weather;
  const mainWeather = weatherDetails[0];

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Meteo Attuale</h2>
      <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
              <p className="font-bold text-lg text-gray-900 dark:text-white">{name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm capitalize">{mainWeather.description}</p>
          </div>
          <div className="flex items-center gap-4 text-right">
              <div>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{Math.round(main.temp)}°C</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Percepiti {Math.round(main.feels_like)}°C</p>
              </div>
              <i className={`fas ${getWeatherIcon(mainWeather.icon)} text-5xl text-amber-400`}></i>
          </div>
      </div>
    </div>
  );
};

export default WeatherWidget;