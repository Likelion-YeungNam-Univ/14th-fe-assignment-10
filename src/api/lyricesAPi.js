const fetchLyrics = async (artist, title) => {
  try {
    const res = await fetch(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(
        artist
      )}/${encodeURIComponent(title)}`
    );

    const data = await res.json();

    if (data.error) {
      return "가사를 찾을 수 없습니다.";
    }

    return data.lyrics;
  } catch (err) {
    return "에러 발생";
  }
};

const fetchSuggestions = async (keyword) => {

  try {

    const res = await fetch(

      `https://api.lyrics.ovh/suggest/${encodeURIComponent(keyword)}`

    );

    const data = await res.json();

    return data.data;

  } catch (err) {

    console.error(err);

    return [];

  }

};

export { fetchLyrics };
export { fetchSuggestions };