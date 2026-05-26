import React from 'react';

const BookmarkList = ({ bookmarks, removeBookmark }) => {
  return (
    <div className="w-full lg:w-[380px] bg-[#161b22]/40 backdrop-blur-md border border-gray-800/60 rounded-3xl p-6 flex flex-col shadow-[0_0_4px_rgba(0,0,0,0.2)]">
      <h3 className="text-gray-400 font-mono font-bold text-xs tracking-wider mb-4 flex items-center justify-between border-b border-gray-800 pb-3">
        <span className="flex items-center gap-2">⭐ BOOKMARKS ({bookmarks.length})</span>
        <span className="text-[10px] text-gray-600">즐겨찾기</span>
      </h3>

      {bookmarks.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 min-h-[250px] lg:min-h-0 border-2 border-dashed border-gray-800 rounded-2xl">
          <span className="text-3xl mb-2 opacity-30">📥</span>
          <p className="text-xs text-gray-500 font-mono">NO_SAVED_QUOTES</p>
          <p className="text-[11px] text-gray-600 mt-1">상단의 하트를 눌러 명언을 저장하세요.</p>
        </div>
      ) : (
        <ul className="flex-1 space-y-3 overflow-y-auto max-h-[400px] lg:max-h-[450px] pr-1 scrollbar-thin">
          {bookmarks.map((b, index) => (
            <li
              key={index}
              className="bg-[#1c2128]/60 p-4 rounded-xl border border-gray-800/80 flex justify-between items-start gap-4 transition-all duration-200 hover:border-cyan-500/20 hover:bg-[#1c2128]"
            >
              <div className="flex flex-col flex-1">
                <p className="text-gray-200 text-sm leading-relaxed font-sans">"{b.message}"</p>
                <p className="text-cyan-400/70 text-xs font-mono mt-1.5 font-medium">_ {b.author}</p>
              </div>
              <button
                onClick={() => removeBookmark(b.message)}
                className="text-xs text-gray-600 hover:text-red-400 font-mono border border-transparent hover:border-red-500/20 hover:bg-red-500/5 px-2 py-1 rounded-md transition-all"
              >
                DEL
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkList;