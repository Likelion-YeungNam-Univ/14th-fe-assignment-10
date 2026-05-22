const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    if (data.cod === 401) {
      throw new Error("API 키가 유효하지 않거나 활성화되지 않았습니다.");
    }

    throw new Error(data.message || "날씨 정보를 가져오는데 실패했습니다.");
  }

  return data;
};
