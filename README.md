# 사용할 API
- https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search?console=1   

## API git 
- https://github.com/NTag/lyrics.ovh/tree/main  

```
API
An API is available to get the lyrics of a song:

GET https://api.lyrics.ovh/v1/{artist}/{title}
Returns { "lyrics": "..." } or a 404 error.

A suggestion endpoint is also available:

GET https://api.lyrics.ovh/suggest/{search term}
Returns search results from Deezer.
```

import { useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import LyricsBox from "./components/LyricsBox.jsx";
import {
  fetchLyrics,
  fetchSuggestions,
} from "./api/lyricesApi.js";

import { Disc3 } from "lucide-react";

export default function App() {
  const [lyrics, setLyrics] = useState("가사를 검색해보세요.");
  const [loading, setLoading] = useState(false);

  const [songInfo, setSongInfo] = useState({
    artist: "Lyrics Viewer",
    title: "Now Playing",
  });

  const [songs, setSongs] = useState([]);

  const handleSearch = async (keyword) => {
    try {
      setLoading(true);

      const suggestionResult =
        await fetchSuggestions(keyword);

      setSongs(suggestionResult);

      if (suggestionResult.length > 0) {
        const firstSong = suggestionResult[0];

        const lyricsResult = await fetchLyrics(
          firstSong.artist.name,
          firstSong.title
        );

        setLyrics(lyricsResult);

        setSongInfo({
          artist: firstSong.artist.name,
          title: firstSong.title,
        });
      }
    } catch (err) {
      setLyrics("가사를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0b0b0f] text-white">
      {/* 배경 블러 */}
      <div className="absolute left-0 top-[-120px] h-[400px] w-[400px] rounded-full bg-pink-500/30 blur-3xl" />

      <div className="absolute right-0 top-[200px] h-[400px] w-[400px] rounded-full bg-red-500/20 blur-3xl" />

      <div className="absolute bottom-0 left-[30%] h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
        <div className="grid w-full gap-10 lg:grid-cols-2">
          {/* 왼쪽 */}
          <div className="flex flex-col justify-center">
            <h1
              className="
                mb-6
                bg-gradient-to-r
                from-white
                via-pink-200
                to-red-300
                bg-clip-text
                text-6xl
                font-bold
                leading-tight
                text-transparent
              "
            >
              Find Lyrics
            </h1>

            <p className="mb-10 text-lg text-zinc-400">
              원하는 노래의 가사를 검색해보세요.
            </p>

            <SearchForm onSearch={handleSearch} />

            {/* 검색 결과 */}
            {songs.length > 0 && (
              <div className="mt-8 space-y-3">
                {songs.slice(0, 5).map((song) => (
                  <button
                    key={song.id}
                    onClick={async () => {
                      try {
                        setLoading(true);

                        const lyricsResult =
                          await fetchLyrics(
                            song.artist.name,
                            song.title
                          );

                        setLyrics(lyricsResult);

                        setSongInfo({
                          artist: song.artist.name,
                          title: song.title,
                        });
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-4
                      text-left
                      backdrop-blur-xl
                      transition
                      duration-300
                      hover:scale-[1.02]
                      hover:bg-white/10
                    "
                  >
                    <h3 className="font-semibold">
                      {song.title}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      {song.artist.name}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 오른쪽 카드 */}
          <div
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/5
              p-8
              shadow-2xl
              backdrop-blur-2xl
            "
          >
            <div className="mb-8 flex items-center gap-5">
              {/* 회전 디스크 */}
              <div
                className="
                  relative
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-pink-500
                  via-red-500
                  to-purple-500
                  shadow-2xl
                "
              >
                <div
                  className={`
                    absolute
                    inset-0
                    rounded-full
                    border-[6px]
                    border-white/10
                    border-t-white/60
                    ${
                      loading ? "animate-spin" : ""
                    }
                  `}
                  style={{
                    animationDuration: "6s",
                  }}
                />

                {/* 가운데 홀 */}
                <div
                  className="
                    absolute
                    h-5
                    w-5
                    rounded-full
                    border
                    border-white/20
                    bg-black/60
                  "
                />

                <Disc3
                  size={34}
                  className="z-10 text-white"
                />
              </div>

              <div>
                <h2 className="text-3xl font-semibold">
                  {songInfo.title}
                </h2>

                <p className="text-zinc-400">
                  {songInfo.artist}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="mt-20 text-center text-zinc-500">
                Loading...
              </div>
            ) : (
              <LyricsBox lyrics={lyrics} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}