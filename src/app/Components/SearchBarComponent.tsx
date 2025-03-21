"use client";

import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load Local Storage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save Local Storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchFunct = () => {
    if (!searchText.trim()) return;
    onSearch(searchText.trim());

    // Optional: Add to favorites if not already there
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
    <section className="bg-gray-900 p-4 flex items-center justify-between">
      {/* Favorites Button */}
      <button onClick={() => setShowFavorites(!showFavorites)} className="text-white">
        <i className="fa-solid fa-bars fa-xl"></i>
      </button>

      {/* Favorites Offcanvas */}
      {showFavorites && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-white text-2xl">Favorites</h5>
              <button onClick={() => setShowFavorites(false)} className="text-white">Close</button>
            </div>
            {favorites.length === 0 ? (
              <p className="text-gray-400">No favorites yet.</p>
            ) : (
              <ul className="space-y-2">
                {favorites.map((fav, index) => (
                  <li key={index} className="text-white flex justify-between items-center">
                    <button onClick={() => handleFavoriteClick(fav)}>{fav}</button>
                    <button onClick={() => {
                      const updated = favorites.filter(f => f !== fav);
                      setFavorites(updated);
                    }} className="text-red-400 ml-2">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="relative w-1/2">
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="City, State(if applicable), Country"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchFunct()}
        />
      </div>

      {/* Search Button */}
      <button onClick={searchFunct} className="text-white ml-2">
        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
      </button>
    </section>
  );
}
