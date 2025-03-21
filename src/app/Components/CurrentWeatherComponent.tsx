"use client"

import { useEffect, useState } from "react"; 
import { CurrentDate } from "../Interfaces/currentTime";
import { grabWeatherAPI } from "../Service/API";

export default function CurrentWeather({ city, temp, condition, conditionIcon, low, high, date }: CurrentDate)
{
  const iconUrl = `https://openweathermap.org/img/wn/${conditionIcon}@2x.png`;

    return (
      <section className="flex items-center justify-center bg-gray-800 text-white p-6">
        {/* City, Temp, Weather */}
        <div className="mt-6 text-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="inline-flex item-center">
              <p className="text-4xl font-thin"> {city.name}</p>
              <p className="text-2xl ms-2 font-bold">{city.country}</p>
            </div>           
            <div className="">
              <p>Low / High</p>
              <p className="text-2xl">{high}°F / {low}°F </p>
            </div>


             <div className="inline-flex">
             <p className="text-5xl">{temp}°F</p>
              <img src={iconUrl} alt="condition icon" className="w-16 pb-3" /> 
              <p className="text-lg">{condition}</p>
            </div>
            <div className=" pt-2 text-3xl">
              {date}
            </div>
          </div>
          
          
        </div>
  
        {/* High/Low & Weather Condition */}
       

      </section>
    );
  }
  