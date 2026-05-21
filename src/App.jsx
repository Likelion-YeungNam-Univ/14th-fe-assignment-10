import { useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import LyricsBox from "./components/LyricsBox.jsx";
import { fetchLyrics, fetchSuggestions } from "./api/lyricsAPi.js";

import { Disc3 } from "lucide-react";

export default function App() {
  const [lyrics, setLyrics] = useState("가사를 검색해보세요.");
  const [searchLoading, setSearchLoading] = useState(false);
  const [lyricsLoading, setLyricsLoading] = useState(false);

  const [songInfo, setSongInfo] = useState({
    artist: "Lyrics Viewer",
    title: "Now Playing",
  });

  const [songs, setSongs] = useState([]);



  const handleSearch = async (keyword) => {
    try {
      setSearchLoading(true);
      const suggestionResult = await fetchSuggestions(keyword);
      setSongs(suggestionResult);
    } catch (err) {
      setLyrics("검색 결과를 불러오지 못했습니다.");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h1>Find Lyrics</h1>

            <p>원하는 노래의 가사를 검색해보세요.</p>

            <SearchForm
              onSearch={handleSearch}
              loading={loading}
            />

            {songs.length > 0 && (
              <div>
                {songs.slice(0, 5).map((song) => (
                  <button
                    key={song.id}
                    onClick={async () => {
                      try {
                        setLyricsLoading(true);

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
                      } catch (err) {
                        setLyrics("가사를 불러오지 못했습니다.");
                      } finally {
                        setLyricsLoading(false);
                      }
                    }}
                  >
                    <h3>{song.title}</h3>

                    <p>{song.artist.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div>
              <div>
                <Disc3 size={34} />
              </div>

              <div>
                <h2>{songInfo.title}</h2>

                <p>{songInfo.artist}</p>
              </div>
            </div>

            {lyricsLoading ? (
              <div>Loading...</div>
            ) : (
              <LyricsBox lyrics={lyrics} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}