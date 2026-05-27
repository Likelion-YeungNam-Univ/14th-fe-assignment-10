import { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [searchCity, setSearchCity] = useState(""); 
  const [weather, setWeather] = useState(null);      
  const [loading, setLoading] = useState(false);     
  const [error, setError] = useState(null);          

  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (!searchCity.trim()) return window.alert("지역명을 입력해주세요!");

    setLoading(true);
    setError(null);
    setWeather(null);

    let cityNameForAPI = searchCity.trim();
    if (cityNameForAPI.length === 2 && cityNameForAPI !== "제주") {
      cityNameForAPI = cityNameForAPI + "시";
    } 

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityNameForAPI},KR&appid=${API_KEY}&units=metric&lang=kr`
      );
      setWeather(response.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setError(`'${searchCity}' 지역을 찾을 수 없습니다.`);
      } else {
        setError("날씨 정보를 가져오지 못했습니다.");
      }
      window.alert("날씨 검색 실패!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md h-130 bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700 text-white flex flex-col justify-between mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-400">
          🌤️ 실시간 날씨 검색
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="예 : 서울특별시, 대구광역시 또는 Seoul"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-700 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 border border-slate-600 transition text-sm"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-md text-sm whitespace-nowrap">
            검색
          </button>
        </form>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center my-2">
        {loading && (
          <div className="text-center text-blue-400 font-semibold text-sm">
            🔄 실시간 기상 데이터 동기화 중...
          </div>
        )}
        
        {error && (
          <div className="text-center text-red-400 bg-red-950/40 border border-red-900/50 py-3 rounded-xl text-xs px-4 w-full">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && weather && (
          <div className="w-full bg-slate-700/40 rounded-xl p-4 border border-slate-700/60 text-center">
            <h2 className="text-xl font-bold text-slate-100">
              📍 {weather.name}, {weather.sys.country}
            </h2>
            
            <div className="flex justify-center">
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                alt="날씨 아이콘"
                className="w-28 h-28 object-contain"
              />
            </div>

            <div className="text-6xl font-black text-white mb-2">
              {Math.round(weather.main.temp)}°C
            </div>
            <p className="text-slate-400 text-xs font-medium mb-4">
              체감 온도: {Math.round(weather.main.feels_like)}°C
            </p>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-600/40 text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="block text-slate-400 font-semibold mb-0.5">💧 습도</span>
                <span className="font-bold text-sm text-blue-400">{weather.main.humidity}%</span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span className="block text-slate-400 font-semibold mb-0.5">💨 풍속</span>
                <span className="font-bold text-sm text-teal-400">{weather.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && !weather && (
          <p className="text-center text-slate-400 text-xs bg-slate-700/20 py-8 px-4 rounded-xl border border-dashed border-slate-700 w-full">
            도시 이름을 한글 또는 영어로 입력하시면<br/>실시간 기상 예보가 이곳에 표시됩니다.
          </p>
        )}
      </div>

      <div className="text-center text-[10px] text-slate-500 border-t border-slate-700">
        OpenWeatherMap API
      </div>
    </div>
  );
};

export default Weather;