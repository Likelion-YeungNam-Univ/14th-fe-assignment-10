import { useState } from "react";
import { Search } from "lucide-react";
const styles = {
  form: "flex flex-col gap-5",
  searchWrapper: "relative",
  searchIcon:
    "absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500",
  searchInput:
    "w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-lg text-white outline-none backdrop-blur-xl transition duration-300 placeholder:text-zinc-500 focus:border-pink-400 focus:bg-white/10",
  submitButton:
    "flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 py-4 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed",
};
function SearchForm({
  onSearch,
  loading,
}) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    onSearch(keyword);

    setKeyword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <div className={styles.searchWrapper}>
        <Search
          size={20}
          className={styles.searchIcon}
        />

        <input
          type="text"
          placeholder="Search songs..."
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)}
          className = {styles.searchInput}
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className={styles.submitButton}>
        <Search size={20} />

        {loading ? "Loading..." : "Search"}
      </button>
    </form>
  );
}

export default SearchForm;