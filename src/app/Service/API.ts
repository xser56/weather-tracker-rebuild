import { CurrentDate } from "../Interfaces/currentTime";

const myKey = "912423fbae3a70a3af91a65f583a662f" 

export const grabWeatherAPI = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?=&lat=37.961632&lon=-121.275604&units=imperial&appid=${myKey}`)
    const data: CurrentDate = await response.json();
    console.log(data);

    return data;
}