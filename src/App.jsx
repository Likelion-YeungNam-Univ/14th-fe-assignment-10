import { useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import LyricsBox from "./components/LyricsBox.jsx";
import { fetchLyrics, fetchSuggestions } from "./api/lyricsAPi.js";

import { Disc3 } from "lucide-react";

const styles = {
  container:
    "h-screen overflow-hidden bg-[#0b0b0f] text-white",

  blurTopLeft:
    "absolute left-0 top-[-120px] h-[400px] w-[400px] rounded-full bg-pink-500/30 blur-3xl",

  blurTopRight:
    "absolute right-0 top-[200px] h-[400px] w-[400px] rounded-full bg-red-500/20 blur-3xl",

  blurBottom:
    "absolute bottom-0 left-[30%] h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-3xl",

  layout:
    "relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6",

  grid:
    "grid w-full gap-10 lg:grid-cols-2",

  leftSection:
    "flex flex-col justify-center",

  title: `
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
  `,

  description:
    "mb-10 text-lg text-zinc-400",

  songsWrapper:
    "mt-8 space-y-3",

  songButton: `
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
  `,

  songTitle:
    "font-semibold",

  songArtist:
    "text-sm text-zinc-400",

  rightCard: `
    rounded-[40px]
    border
    border-white/10
    bg-white/5
    p-8
    shadow-2xl
    backdrop-blur-2xl
  `,

  cardHeader:
    "mb-8 flex items-center gap-5",

  discWrapper: `
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
  `,

  spinningBorder: `
    absolute
    inset-0
    rounded-full
    border-[6px]
    border-white/10
    border-t-white/60
  `,

  discCenter: `
    absolute
    h-5
    w-5
    rounded-full
    border
    border-white/20
    bg-black/60
  `,

  discIcon:
    "z-10 text-white",

  songInfoTitle:
    "text-3xl font-semibold",

  songInfoArtist:
    "text-zinc-400",

  loading:
    "mt-20 text-center text-zinc-500",
};

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
    <div className={styles.container}>
      <div className={styles.blurTopLeft} />
      <div className={styles.blurTopRight} />
      <div className={styles.blurBottom} />

      <div className={styles.layout}>
        <div className={styles.grid}>
          <div className={styles.leftSection}>
            <h1 className={styles.title}>Find Lyrics</h1>
            <p className={styles.description}>원하는 노래의 가사를 검색해보세요.</p>
            <SearchForm
              onSearch={handleSearch}
              loading={searchLoading}
            />
            {songs.length > 0 && (
              <div className={styles.songsWrapper}>
                {songs.slice(0, 5).map((song) => (
                  <button 
                    className={styles.songButton}
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
                    <h3 className={styles.songTitle}>{song.title}</h3>
                    <p className={styles.songArtist}>{song.artist.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.rightCard}>
            <div className={styles.cardHeader}>
              <div className={styles.discWrapper}>
                <div className={styles.spinningBorder} />
                <div className={styles.discCenter} />

                <div className={styles.discIcon}>
                  <Disc3 size={34} />
                </div>
              </div>

              <div>
                <h2 className={styles.songInfoTitle}>{songInfo.title}</h2>
                <p className={styles.songInfoArtist}>{songInfo.artist}</p>
              </div>
            </div>

            {lyricsLoading ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              <LyricsBox lyrics={lyrics} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}