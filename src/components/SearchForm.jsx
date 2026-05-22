function SearchForm({ city, setCity, onSearch }) {
  return (
    <form onSubmit={onSearch} className="w-full max-w-md flex gap-2 mb-8">
      <input
        type="text"
        placeholder="도시 이름 입력 (예: Seoul)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white"
      />

      <button
        type="submit"
        className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl"
      >
        검색
      </button>
    </form>
  );
}

export default SearchForm;
