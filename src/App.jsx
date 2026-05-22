import React, { useState } from "react";

import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import LoadingMessage from "./components/LoadingMessage";

import { getWeather } from "./api/weatherApi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(
        err.message === "city not found"
          ? "도시를 찾을 수 없습니다."
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 text-white flex flex-col items-center p-6">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-indigo-900">실시간 날씨 경보</h1>

        <p className="text-gray-500">실시간 예보 사이트</p>
      </header>

      <SearchForm city={city} setCity={setCity} onSearch={fetchWeather} />

      {loading && <LoadingMessage />}

      {error && <p className="text-red-500">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
