"use client"

import { useEffect, useState } from "react"; 
import { CurrentDate } from "../Interfaces/currentTime";

type Props = CurrentDate;

export default function CurrentWeather(props: CurrentDate) {
  const [localData, setLocalData] = useState<CurrentDate | null>(null);

  // Save To Local
  useEffect(() => {
    if (props.city.name) {
      localStorage.setItem("currentWeather", JSON.stringify(props));
      setLocalData(props);
    } else {
      // Load From Local
      const saved = localStorage.getItem("currentWeather");
      if (saved) {
        setLocalData(JSON.parse(saved));
      }
    }
  }, [props]);

  // No initial data
  if (!localData) {
    return (
      <div className="text-white mt-6 text-lg font-light">
        Please Enter a city...
      </div>
    );
  }

  const { city, temp, condition, conditionIcon, low, high, date } = localData;
  const iconUrl = `https://openweathermap.org/img/wn/${conditionIcon}@2x.png`;

    return (
      <section className=" mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 text-white w-full max-w-md shadow-lg ">
        {/* City, Temp, Weather */}
        <div className="mt-6 text-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="inline-flex items-center">
              <p className="text-4xl font-thin"> {city.name}</p>
              <p className="text-2xl ms-2 font-medium">{city.country}</p>
            </div>           
            <div className="font-thin">
              <p>Low / High</p>
              <p className="text-2xl ">{high}°F / {low}°F </p>
            </div>


             <div className="inline-flex">
             <p className="text-5xl font-thin">{temp}°F</p>
              <img src={iconUrl} alt="condition icon" className="w-16 pb-3" /> 
              <p className="text-lg">{condition}</p>
            </div>
            <div className=" pt-2 text-4xl font-thin">
              {date}
            </div>
          </div>
          
        </div>

        {/* <div className="flex justify-between items-center">
    <div>
      <h2 className="text-4xl font-light">Stockton</h2>
      <p className="text-sm">Friday • 12/6</p>
    </div>
    <div className="text-right">
      <p className="text-lg">64° / 38°</p>
      <p className="text-sm">Haze</p>
    </div>
  </div> */}
  
        {/* High/Low & Weather Condition */}
       

      </section>
    );
  }
  