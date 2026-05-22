function WeatherCard({ weather }) {
  return (
    <div className="w-full max-w-md bg-slate-800 rounded-2xl p-6 text-center">
      <h2 className="text-3xl font-bold mb-1">
        {weather.name}, {weather.sys.country}
      </h2>

      <p className="text-slate-400">{weather.weather[0].description}</p>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt="날씨 아이콘"
        className="w-32 h-32 mx-auto"
      />

      <div className="text-6xl font-black text-sky-400 mb-6">
        {Math.round(weather.main.temp)}°C
      </div>

      <div className="grid grid-cols-2 gap-3 text-left">
        <div className="bg-slate-700/30 p-3 rounded-xl">
          <span className="text-xs text-slate-400 block">체감 온도</span>

          <span className="font-semibold">
            {Math.round(weather.main.feels_like)}°C
          </span>
        </div>

        <div className="bg-slate-700/30 p-3 rounded-xl">
          <span className="text-xs text-slate-400 block">습도</span>

          <span className="font-semibold">{weather.main.humidity}%</span>
        </div>

        <div className="bg-slate-700/30 p-3 rounded-xl">
          <span className="text-xs text-slate-400 block">최고 / 최저</span>

          <span className="text-red-400">
            {Math.round(weather.main.temp_max)}°
          </span>

          {" / "}

          <span className="text-sky-400">
            {Math.round(weather.main.temp_min)}°
          </span>
        </div>

        <div className="bg-slate-700/30 p-3 rounded-xl">
          <span className="text-xs text-slate-400 block">풍속</span>

          <span>{weather.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
