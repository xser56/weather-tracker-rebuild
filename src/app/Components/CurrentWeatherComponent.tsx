"use client";

import { useEffect, useState } from "react";
import { CurrentDate } from "../Interfaces/currentTime";

export default function CurrentWeather(props: CurrentDate) {
  const [localData, setLocalData] = useState<CurrentDate | null>(null);

  // --------------------------------------------------------------- Save To Local
  useEffect(() => {
    if (props.city.name) {
      localStorage.setItem("currentWeather", JSON.stringify(props));
      setLocalData(props);
    } else {
      // ----------------------------------------------------------- Load From Local
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

  const addToFavorites = () => {
    if (!city?.name) return;

    const saved = localStorage.getItem("favorites");
    const favs = saved ? JSON.parse(saved) : [];

    if (favs.includes(city.name)) {
      alert(`${city.name} is already in your favorites!`);
      return;
    }

    favs.push(city.name);
    localStorage.setItem("favorites", JSON.stringify(favs));
    window.dispatchEvent(new Event("favoritesUpdated"));

    alert(`${city.name} was added to your favorites!`);
  };

  return (
    <section className=" mt-8 bg-white/10 backdrop-blur-md rounded-xl text-white w-full max-w-md shadow-lg ">
      {/* City, Temp, Weather */}
      <button
        onClick={addToFavorites}
        className="h-5 w-5 cursor-pointer transition transform hover:scale-110 active:scale-90 hover:brightness-125 flex justify-end ms-2 mt-3"
      >
        <img src="/assets/star.png" alt="favorites" />
      </button>
      <div className="mx-6 text-center">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="inline-flex items-center">
            <p className="text-4xl font-thin"> {city.name}</p>
            <p className="text-2xl ms-2 font-light relative bottom-4">
              {city.country}
            </p>
          </div>
          <div className="font-thin">
            <p>Low / High</p>
            <p className="text-2xl ">
              {high}°F / {low}°F{" "}
            </p>
          </div>

          <div className="inline-flex">
            <p className="text-4xl font-thin">{temp}°F</p>
            <img src={iconUrl} alt="condition icon" className="w-16 " />
            <p className="text-lg relative bottom-3 right-10">{condition}</p>
          </div>
          <div className=" text-4xl font-thin">{date}</div>
        </div>
      </div>
    </section>
  );
}
