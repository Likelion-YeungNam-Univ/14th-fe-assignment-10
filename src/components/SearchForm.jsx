import { useState } from "react";
import { Search } from "lucide-react";
const styles = {
  form: "flex flex-col gap-5",

  searchWrapper: "relative",

  searchIcon:
    "absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400",

  searchInput: `
    w-full
    rounded-2xl
    border
    border-zinc-200
    bg-white
    py-4
    pl-14
    pr-5
    text-lg
    text-zinc-900
    outline-none
    shadow-sm
    transition
    duration-300
    placeholder:text-zinc-400
    focus:border-pink-400
    focus:ring-4
    focus:ring-pink-100
  `,

  submitButton: `
    flex
    items-center
    justify-center
    gap-2
    rounded-2xl
    bg-gradient-to-r
    from-pink-500
    to-red-500
    py-4
    font-semibold
    text-white
    shadow-lg
    transition
    duration-300
    hover:scale-[1.02]
    hover:brightness-110
    active:scale-[0.99]
    disabled:cursor-not-allowed
    disabled:opacity-50
  `,
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