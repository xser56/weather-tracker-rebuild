"use client";

import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchFunct = () => {
    if (!searchText.trim()) return;

    onSearch(searchText.trim());

    if (!favorites.includes(searchText.trim())) {
      setFavorites([...favorites, searchText.trim()]);
    }

    setSearchText("");
  };

  const handleFavoriteClick = (city: string) => {
    onSearch(city);
    setShowFavorites(false);
  };

  return (
    <section className=" relative z-[50] flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 w-full max-w-md shadow-lg ">
      {/* Favorites Toggle Button */}
      <button onClick={() => setShowFavorites(!showFavorites)} className="text-white">
        <img src="/assets/star.png" alt="favorites" className="h-4 w-4"/>
      </button>

      {/* Favorites Dropdown */}
      {showFavorites && (
        <div className="absolute top-full mt-2 left-0 bg-blue-300/80 backdrop-blur-md text-white rounded-lg p-4 shadow-lg w-64 z-[9999]">
        <h3 className="text-lg font-bold mb-2">Favorites</h3>
          {favorites.length === 0 ? (
            <p className="text-gray-400">Add a Favorite.</p>
          ) : (
            <ul className="space-y-2">
              {favorites.map((fav, index) => (
                <li key={index} className="flex justify-between items-center">
                  <button onClick={() => handleFavoriteClick(fav)}>{fav}</button>
                  <button
                    onClick={() => {
                      const updated = favorites.filter((f) => f !== fav);
                      setFavorites(updated);
                    }}
                    className="text-red-400 ml-2"
                  >
        <img src="/assets/bin.png" alt="favorites" className="h-4 w-4 "/>
        </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Search Input */}
      <div className="relative w-1/2 left-4">
      <input
    type="text"
    placeholder="Enter a city"
    className="flex-1 bg-transparent text-white placeholder-stone-100 outline-none font-light"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && searchFunct()}
  />
      </div>
    </section>
  );
}