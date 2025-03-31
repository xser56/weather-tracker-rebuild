import { CurrentDate } from "../Interfaces/currentTime";
import { myKey } from "./key";

export const grabWeatherAPI = async (city: string) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${myKey}`);
      
    const data = await response.json(); 
  
    return data; 
  };
  
