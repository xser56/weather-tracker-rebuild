"use client"

import SearchBar from "./Components/SearchBarComponent";
import CurrentWeather from "./Components/CurrentWeatherComponent";
import FiveDayForecast from "./Components/ForcastComponent";
import { useEffect, useState } from "react";
import { grabWeatherAPI } from "./Service/API";
import { CurrentDate } from "./Interfaces/currentTime";

function App() {

  const [data, setData] = useState<CurrentDate>({
    city: { name: "", country: "" },
    temp: 0,
    condition: "",
    conditionIcon: "",
    high: 0,
    low: 0,
    date: ""
  });
  
  useEffect(() => {
    const fetchWeatherAPI = async () => {     
        const apiData = await grabWeatherAPI();
        // console.log("Fetched Data HERE", apiData.list[7].main.temp_max); 
  
        setData({
          city: { 
            name: apiData.city.name, 
            country: apiData.city.country
          }, 
          temp: Math.round(apiData.list[0].main.temp),
          condition: apiData.list[0].weather[0].main,
          conditionIcon: apiData.list[0].weather[0].icon,
          high: Math.round(apiData.list[4].main.temp_max),
          low: Math.round(apiData.list[7].main.temp_min),
          date: new Date(apiData.list[0].dt_txt).toLocaleDateString("en-US", { weekday: "long" })
        });
    };
    fetchWeatherAPI();
  }, []);

  
  
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <SearchBar onSearch={grabWeatherAPI}/>
      <CurrentWeather 
      city={data.city} 
      temp={data.temp} 
      condition={data.condition} 
      conditionIcon={data.conditionIcon} 
      high={data.high} 
      low={data.low} 
      date={data.date}/>      
      <FiveDayForecast />
    </div>
  );
}

export default App;
