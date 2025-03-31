import { CurrentDate } from "../Interfaces/currentTime";

const myKey = "912423fbae3a70a3af91a65f583a662f";

export const grabWeatherAPI = async (city: string) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${myKey}`);
      
    const data = await response.json(); 
  
    return data; 
  };
  
