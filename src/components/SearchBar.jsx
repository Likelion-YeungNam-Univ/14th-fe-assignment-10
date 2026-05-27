import React from 'react';

const SearchBar = ({
  keyword,
  setKeyword,
  onSearch,
  loading,
  limit,
  setLimit,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-8">
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="레시피를 검색해보세요 (예: 김치)"
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
        >
          <option value={10}>10개씩</option>
          <option value={20}>20개씩</option>
          <option value={30}>30개씩</option>
          <option value={50}>50개씩</option>
        </select>
      </div>
      <button
        onClick={onSearch}
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-colors disabled:bg-gray-400 whitespace-nowrap"
      >
        {loading ? '검색 중...' : '검색'}
      </button>
    </div>
  );
};

export default SearchBar;
