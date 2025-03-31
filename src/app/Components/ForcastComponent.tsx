"use client";

import { useEffect, useState } from "react";
import { grabWeatherAPI } from "../Service/API";
import { DayForecast } from "../Interfaces/weekData";

export default function FiveDayForecast({ city }: { city: string }) {
  const [forecastData, setForecastData] = useState<DayForecast[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const apiData = await grabWeatherAPI(city);

      const groupedByDay: { [date: string]: any[] } = {};
      const todayStr = new Date().toLocaleDateString("en-US");

      // Grab Dates
      apiData.list.forEach((entry: any) => {
        const dateStr = new Date(entry.dt * 1000).toLocaleDateString("en-US");

        if (dateStr === todayStr) return; // Skip today's date

        if (!groupedByDay[dateStr]) {
          groupedByDay[dateStr] = [];
        }
        groupedByDay[dateStr].push(entry);
      });

      // Get 5 days data
      const forecastDays = Object.keys(groupedByDay).slice(0, 5);

      const dateData = forecastDays.map((dateStr) => {
        const dataEntries = groupedByDay[dateStr];

        const temps = dataEntries.map((e) => e.main.temp);
        const high = Math.max(...temps);
        const low = Math.min(...temps);

        const midday = dataEntries[Math.floor(dataEntries.length / 2)];
        const date = new Date(midday.dt * 1000);

        // Convert Data
        return {
          day: date.toLocaleDateString("en-US", { weekday: "long" }),
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          icon: `https://openweathermap.org/img/wn/${midday.weather[0].icon}@2x.png`,
          high: Math.round(high),
          low: Math.round(low),
        };
      });

      setForecastData(dateData);
    };

    fetchForecast();
  }, [city]);


  
  return (
    <section className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-lg font-light">
      {forecastData.map((day, index) => (
    <div key={index} className="grid grid-cols-3 py-2 items-center text-white ">
      <div className="text-left">
        <p className="text-md">{day.day}</p>
        <p className="text-xs">{day.date}</p>
      </div>
      <div className="flex justify-center">
        <img src={day.icon} alt="weather icon" className="w-8 h-8 object-contain" />
      </div>
      <div className="flex justify-end space-x-2 font-thin">
        <p className="text-md text-white">{day.low}°</p>
        <p className="text-md text-white">{day.high}°</p>
      </div>
    </div>
      ))}
    </section>
  );
}
