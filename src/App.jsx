import { useState } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
//확인 : console.log(API_KEY);

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("영화 제목을 입력하세요!");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);
    setTotal("");

    try {
      //url 규칙에 맞게 전송 : 쿼리 스트링, ? : 파라미터 붙임
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
      const response = await fetch(url); //await:200~299(성공) 사이

      if (!response.ok) {
        throw new Error("오류 발생.");
      }
      //

      const data = await response.json(); // await - json변환
      console.log(data); // 찍어서 json파일에 붙여둠

      if (data.Response === "True") {
        setMovies(data.Search); //대문자 S - 객체의 키 값 불러오기
        setTotal(`총 ${data.totalResults}개 결과`);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      console.error(err);
      setError("해당 검색어에대한 영화가 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[900px] p-8">
      <h1 className="mb-6 text-3xl font-bold">영화 검색</h1>

      <form onSubmit={searchMovies} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="영화 제목을 영어로 입력하세요 (예: batman)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          검색
        </button>
      </form>

      {loading && <p className="mb-4 text-gray-600">검색 중...</p>}
      {error && <p className="mb-4 text-sm text-red-500">error {error}</p>}
      {total && <p className="mb-4 text-sm text-gray-500">{total}</p>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
        {movies.map((movie) => {
          const poster =
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/140x200?text=No+Poster"; //무료 이미지 생성 서비스

          const typeLabel = //한국어 설정
            { movie: "영화", series: "시리즈", episode: "에피소드" }[
              movie.Type
            ] || movie.Type;

          return (
            <div
              key={movie.imdbID}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <img
                src={poster}
                alt={`${movie.Title} 포스터`}
                className=" w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/140x200?text=No+Poster";
                }}
              />
              <div className="p-2.5">
                <p className="mb-1 line-clamp-2 text-sm font-medium leading-snug text-gray-900">
                  {movie.Title}
                </p>
                <p className="text-xs text-gray-500">
                  {movie.Year} - {typeLabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
