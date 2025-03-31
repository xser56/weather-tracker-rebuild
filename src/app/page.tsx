"use client";

import SearchBar from "./Components/SearchBarComponent";
import CurrentWeather from "./Components/CurrentWeatherComponent";
import FiveDayForecast from "./Components/ForcastComponent";
import { useEffect, useState } from "react";
import { grabWeatherAPI } from "./Service/API";
import { CurrentDate } from "./Interfaces/currentTime";

function App() {
  const [cityName, setCityName] = useState("stockton"); // default city
  const [data, setData] = useState<CurrentDate>({
    city: { name: "", country: "" },
    temp: 0,
    condition: "",
    conditionIcon: "",
    high: 0,
    low: 0,
    date: "",
  });

  // Default On load
  useEffect(() => {
    const fetchWeatherAPI = async () => {
      const savedCity = localStorage.getItem("lastCity") || "stockton";
      setCityName(savedCity);

      const apiData = await grabWeatherAPI(savedCity);
      // console.log("Fetched Data HERE", apiData.list[7].main.temp_max);

      setData({
        city: {
          name: apiData.city.name,
          country: apiData.city.country,
        },
        temp: Math.round(apiData.data.main.temp),
        condition: apiData.list[0].weather[0].main,
        conditionIcon: apiData.list[0].weather[0].icon,
        high: Math.round(apiData.list[4].main.temp_max),
        low: Math.round(apiData.list[7].main.temp_min),
        date: new Date(apiData.list[0].dt_txt).toLocaleDateString("en-US", {
          weekday: "long",
        }),
      });
    };
    fetchWeatherAPI();
  }, []);

  // Search bar
  const handleSearch = async (city: string) => {

    localStorage.setItem("lastCity", city);
    const apiData = await grabWeatherAPI(city);

    setCityName(city);
    setData({
      city: {
        name: apiData.city.name,
        country: apiData.city.country,
      },
      temp: Math.round(apiData.list[0].main.temp),
      condition: apiData.list[0].weather[0].main,
      conditionIcon: apiData.list[0].weather[0].icon,
      high: Math.round(apiData.list[4].main.temp_max),
      low: Math.round(apiData.list[7].main.temp_min),
      date: new Date(apiData.list[0].dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
      }),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-400 to-yellow-200 flex flex-col items-center justify-start p-6 font-sans">
      <SearchBar onSearch={handleSearch} />
      <CurrentWeather
        city={data.city}
        temp={data.temp}
        condition={data.condition}
        conditionIcon={data.conditionIcon}
        high={data.high}
        low={data.low}
        date={data.date}
      />
      <FiveDayForecast city={cityName} />
    </div>
  );
}

export default App;
