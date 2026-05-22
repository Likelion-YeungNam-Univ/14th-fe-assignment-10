import axios from "axios";

const fetchLyrics = (artist, title) => {
  return axios
    .get(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(
        artist
      )}/${encodeURIComponent(title)}`
    )
    .then((res) => {
      const data = res.data;

      if (data.error) {
        return "가사를 찾을 수 없습니다.";
      }

      return data.lyrics;
    })
    .catch((err) => {
      console.error("가사 요청 실패", err);

      return "가사를 불러오지 못했습니다.";
    });
};

const fetchSuggestions = (keyword) => {
  return axios
    .get(
      `https://api.lyrics.ovh/suggest/${encodeURIComponent(keyword)}`
    )
    .then((res) => {
      const data = res.data;
      return data.data;
    })
    .catch((err) => {
      console.error("데이터 요청 실패", err);
      return [];
    });
};

export { fetchLyrics, fetchSuggestions };