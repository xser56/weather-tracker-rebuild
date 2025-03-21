"use client";

import { useEffect, useState } from "react";
import { grabWeatherAPI } from "../Service/API";
import { DayForecast } from "../Interfaces/weekData";

export default function FiveDayForecast() {
  const [forecastData, setForecastData] = useState<DayForecast[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiData = await grabWeatherAPI();

        // Grab every 8th entry: list[0], [8], [16], [24], [32] → 5 days
        const simplified = [0, 8, 16, 24, 32].map((index) => {
          const entry = apiData.list[index];
          const dateObj = new Date(entry.dt * 1000);

          return {
            day: dateObj.toLocaleDateString("en-US", { weekday: "long" }),
            date: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`,
            high: Math.round(entry.main.temp_max),
            low: Math.round(entry.main.temp_min),
          };
        });

        setForecastData(simplified);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    };

    fetchForecast();
  }, []);

  return (
    <section className="bg-gray-900 text-white p-6">
      {forecastData.map((day, index) => (
        <div key={index} className="flex justify-between items-center py-4 border-b border-gray-700">
          <div>
            <p className="text-2xl">{day.day}</p>
            <p className="text-lg">{day.date}</p>
          </div>
          <img src={day.icon} alt="weather icon" className="w-16" />
          <div className="flex items-center space-x-2">
            <p className="text-2xl text-blue-400">{day.low}°F</p>
            <p className="text-2xl text-red-400">{day.high}°F</p>
          </div>
        </div>
      ))}
    </section>
  );
}
